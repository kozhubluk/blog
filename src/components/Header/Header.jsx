import {useAuth} from "../../providers/AuthProvider";
import {NavLink} from "react-router-dom";
import styles from './Header.module.scss'
import {ReactComponent as PlusIcon} from "../../assets/svg/add.svg";
import {useModal} from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";
import {useCallback} from "react";
import User from "../User/User";
import PostForm from "../PostForm/PostForm";
import {postStore} from "../../store/PostsStore";
import {observer} from "mobx-react-lite";

const Header = observer(() => {
    const {user, loginAction, logoutAction} = useAuth();
    const {addPost, error} = postStore;

    const {active: activeLogin, open: openLogin, close: closeLogin} = useModal();
    const {active: activePost, open: openPost, close: closePost} = useModal();

    const handleLogin = useCallback((username, password) => {
        if (loginAction(username, password)) closeLogin();
    }, []);

    const handleLogout = useCallback(() => {
        logoutAction();
    }, []);

    const handleAddPost = useCallback(async (title, content, image) => {
        await addPost({
            user,
            title,
            content,
            image
        });
        if (postStore.status === 'resolve') closePost();
    }, [user]);

    return <header className={styles.header}>
        <Modal isOpen={activePost} onClose={closePost}>
            <PostForm submitAction={handleAddPost} error={error} status={postStore.status}/>
        </Modal>
        <Modal isOpen={activeLogin} onClose={closeLogin}>
            <LoginForm handleLogin={handleLogin}/>
        </Modal>
        <NavLink to='/'>Главная</NavLink>
        {user
            ? <>
                <User user={user}/>
                <button className={styles['add-button']} onClick={openPost}><PlusIcon/>Создать</button>
                <button onClick={handleLogout}>Выйти</button>
            </>
            : <button onClick={openLogin}>Войти</button>
        }
    </header>
});

export default Header;