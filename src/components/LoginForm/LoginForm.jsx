import styles from './LoginForm.module.scss';
import {useState} from "react";

const LoginForm = (props) => {
    const {handleLogin} = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        handleLogin(username, password);
    };

    return <form className={styles.login} onSubmit={handleSubmit}>
        <label htmlFor='username'>Логин</label>
        <input name='username' placeholder='Введите логин...' type='text' value={username} onChange={handleUsername}/>
        <label htmlFor='password'>Пароль</label>
        <input name='password' placeholder='Введите пароль...' type='password' value={password}
               onChange={handlePassword}/>
        <input type='submit' value='Войти' disabled={!username.trim() || !password.trim()}/>
    </form>
}

export default LoginForm;