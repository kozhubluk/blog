import Skeleton from '../Skeleton/Skeleton';
import UserSkeleton from '../User/UserSkeleton';
import styles from './CommentItem.module.scss';

const CommentItemSkeleton = () => {
  return (
    <div className={styles.comment}>
      <UserSkeleton />
      <Skeleton width="100%" height="30px" borderRadius="10px" />
    </div>
  );
};

export default CommentItemSkeleton;
