import { useParams } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import Post from '../../components/Post/Post';
import styles from './PostPage.module.scss';
import CommentsList from '../../components/CommentsList/CommentsList';

const PostPage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  return (
    <div className={styles['post-content']}>
      <Post id={id} />
      {user ? (
        <div>
          <CommentsList id={id} />
        </div>
      ) : (
        <h3>Авторизуйтесь, чтобы читать и писать комментарии</h3>
      )}
    </div>
  );
};

export default PostPage;
