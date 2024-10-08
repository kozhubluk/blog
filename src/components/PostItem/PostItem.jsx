import { NavLink } from 'react-router-dom';
import styles from './PostItem.module.scss';
import { observer } from 'mobx-react-lite';
import User from '../User/User';
import { ReactComponent as EditIcon } from '../../assets/svg/edit.svg';
import { ReactComponent as DeleteIcon } from '../../assets/svg/remove.svg';

const PostItem = observer((props) => {
  const { post, user, onEdit, onDelete } = props;

  const handleEditPost = (e) => {
    e.preventDefault();
    onEdit(post);
  };

  const handleDeletePost = (e) => {
    e.preventDefault();
    onDelete(post.id);
  };

  return (
    <NavLink to={`post/${post.id}`} className={styles.post}>
      {post.user?.id === user?.id && (
        <div className={styles.panel}>
          <button onClick={handleEditPost}>
            <EditIcon />
          </button>
          <button onClick={handleDeletePost}>
            <DeleteIcon />
          </button>
        </div>
      )}

      <div className={styles.preview}>
        {!!post.image && (
          <img alt="Изображение к посту" className={styles.image} src={post.image} />
        )}
      </div>
      <div className={styles.details}>
        <User user={post.user} />
        <p className={styles.title}>{post.title}</p>
        <p className={styles.text}>{post.content}</p>
      </div>
    </NavLink>
  );
});

export default PostItem;
