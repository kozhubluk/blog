import {useAuth} from "../../providers/AuthProvider";
import {NavLink} from "react-router-dom";
import styles from './Header.module.scss'
import {ReactComponent as PlusIcon} from "../../assets/svg/add.svg";
import {useModal} from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";
import {useCallback} from "react";
import User from "../User/User";

const Header = () => {
    const {user, loginAction, logoutAction} = useAuth();
    const {active: activeLogin, open: openLogin, close: closeLogin} = useModal();

    const handleLogin = useCallback((username, password) => {
        if (loginAction(username, password)) closeLogin();
    }, []);

    const handleLogout = useCallback(() => {
        logoutAction();
    }, []);

    return <header className={styles.header}>
        <Modal isOpen={activeLogin} onClose={closeLogin}>
            <LoginForm handleLogin={handleLogin}/>
        </Modal>
        <NavLink to='/'>Главная</NavLink>
        {user
            ? <>
                <User user={user}/>
                <button className={styles['add-button']}><PlusIcon/>Создать</button>
                <button onClick={handleLogout}>Выйти</button>
            </>
            : <button onClick={openLogin}>Войти</button>
        }
    </header>
}

export default Header;