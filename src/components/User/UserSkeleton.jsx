import styles from './User.module.scss';
import Skeleton from '../Skeleton/Skeleton';

const UserSkeleton = () => {
  return (
    <div className={styles.user}>
      <Skeleton className={styles.avatar} />
      <Skeleton width="33%" height="15px" borderRadius="12px" />
    </div>
  );
};

export default UserSkeleton;
