import styles from './PostItem.module.scss';
import Skeleton from '../Skeleton/Skeleton';
import UserSkeleton from '../User/UserSkeleton';

const PostItemSkeleton = () => {
  return (
    <div className={styles.post}>
      <div className={styles.preview}>
        <Skeleton className={styles.image} />
      </div>
      <div className={styles.skeleton}>
        <UserSkeleton />
        <Skeleton width="100%" height="20px" borderRadius="12px" />
        <Skeleton width="100%" height="65px" borderRadius="12px" />
      </div>
    </div>
  );
};

export default PostItemSkeleton;
