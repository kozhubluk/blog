import styles from './LoginForm.module.scss';
import { memo, useState } from 'react';

const LoginForm = memo((props) => {
  const { handleLogin } = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <form className={styles.login} onSubmit={handleSubmit}>
      <h2>Войти в аккаунт</h2>
      <label htmlFor="username">Логин</label>
      <input
        name="username"
        placeholder="Введите логин..."
        type="text"
        value={username}
        onChange={handleUsername}
      />
      <label htmlFor="password">Пароль</label>
      <input
        name="password"
        placeholder="Введите пароль..."
        type="password"
        value={password}
        onChange={handlePassword}
      />
      <input type="submit" value="Войти" disabled={!username.trim() || !password.trim()} />
    </form>
  );
});

export default LoginForm;
