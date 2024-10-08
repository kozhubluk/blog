import { useEffect } from 'react';
import { postStore } from '../../store/PostsStore';
import { observer } from 'mobx-react-lite';
import User from '../User/User';
import styles from './Post.module.scss';
import PostSkeleton from './PostSkeleton';

const Post = observer(({ id }) => {
  const { post, status, getPostById } = postStore;
  useEffect(() => {
    getPostById(id);
  }, [getPostById, id]);

  if (status === 'pending' && !Object.keys(post).length) return <PostSkeleton />;

  return (
    <div className={styles.post}>
      <User user={post.user} />
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {!!post.image && <img src={post.image} alt={'Фотография к посту'} />}
    </div>
  );
});

export default Post;
