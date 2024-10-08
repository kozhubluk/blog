import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const loginAction = (username, password) => {
    if (username.trim() && password.trim()) {
      setUser({ id: '1', username: 'kozhubluk', color: 'rgb(69, 88, 97)' });
      return true;
    }
    return false;
  };

  const logoutAction = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginAction, logoutAction }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
