import {createContext, useContext, useState} from "react";

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(localStorage.getItem("user") || null);

    const loginAction = (username, password) => {
        if (username.trim() && password.trim()) {
            setUser({id: "1", username: "kozhubluk"})
        }
    }

    const logoutAction = () => {
        setUser(null);
    }

    return <AuthContext.Provider value={{user, loginAction, logoutAction}}>
        {children}
    </AuthContext.Provider>
};

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;