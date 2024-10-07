import {useAuth} from "../../providers/AuthProvider";
import {NavLink} from "react-router-dom";
import styles from './Header.module.scss'

const Header = () => {
    const {user} = useAuth();

    console.log(user);
    return <header className={styles.header}>
        <NavLink to='/'>Главная</NavLink>
        {user
            ? <>
                <div>{user.username}</div>
                <button>+</button>
                <button>Выйти</button>
            </>
            : <button>Войти</button>
        }
    </header>
}

export default Header;