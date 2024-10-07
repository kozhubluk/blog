import {NavLink} from "react-router-dom";
import styles from './PostItem.module.scss'
import {observer} from "mobx-react-lite";
import User from "../User/User";

const PostItem = observer((props) => {
    const {post} = props;

    return <NavLink to={`post/${post.id}`} className={styles.post}>
        <div className={styles.preview}>
            <img className={styles.image} src={post.image}/>
        </div>
        <div className={styles.details}>
            <User user={post.user}/>
            <p className={styles.title}>{post.title}</p>
            <p className={styles.text}>
                { post.content }
            </p>
        </div>
    </NavLink>
});

export default PostItem;