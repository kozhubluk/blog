import styles from './Post.module.scss';
import UserSkeleton from '../User/UserSkeleton';
import Skeleton from '../Skeleton/Skeleton';

const PostSkeleton = () => {
  return (
    <div className={styles.post}>
      <UserSkeleton />
      <Skeleton width="100%" height="30px" borderRadius="10px"></Skeleton>
      <Skeleton width="100%" height="65px" borderRadius="10px"></Skeleton>
      <Skeleton width="100%" height="200px" borderRadius="10px"></Skeleton>
    </div>
  );
};

export default PostSkeleton;
