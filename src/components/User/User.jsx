import styles from "./User.module.scss";

const User = (props) => {
    const {user} = props;

    return <div className={styles.user}>
        <div className={styles.avatar}>
            <p>
                {user?.username[0] || 'A'}
            </p>
        </div>
        <p>{user?.username}</p>
    </div>
}

export default User;