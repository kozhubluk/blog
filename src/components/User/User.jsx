import styles from './User.module.scss';
import { memo } from 'react';

const User = memo((props) => {
  const { user } = props;

  return (
    <div className={styles.user}>
      <div style={{ backgroundColor: user?.color }} className={styles.avatar}>
        <div>{user?.username[0] || 'A'}</div>
      </div>
      <div className={styles.name}>{user?.username}</div>
    </div>
  );
});

export default User;
