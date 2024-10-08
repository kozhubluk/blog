import styles from './CommentsList.module.scss';
import { commentsStore } from '../../store/CommentsStore';
import { useEffect, useState } from 'react';
import CommentItem from '../CommentItem/CommentItem';
import { observer } from 'mobx-react-lite';
import CommentForm from '../CommentForm/CommentForm';
import { useAuth } from '../../providers/AuthProvider';

const CommentsList = observer((props) => {
  const { id: postId } = props;
  const { user } = useAuth();
  const { getComments, addComment, deleteComment, updateComment, status, error, comments } =
    commentsStore;
  const [editedComment, setEditedComment] = useState(0);

  useEffect(() => {
    getComments(postId);
  }, [getComments, postId]);

  const handleAddComment = async (text) => {
    await addComment({
      user,
      postId,
      text,
    });
  };

  const handleUpdateComment = async (id, text) => {
    await updateComment(id, {
      userId: user.id,
      postId,
      text,
    });
  };

  const handleDeleteComment = (id) => {
    deleteComment(id);
  };

  if (status === 'pending' && !comments.length) return <div>sfdsdf</div>;

  return (
    <div className={styles.comments}>
      <h3>
        Комментарии <span className={styles.counter}>{comments.length}</span>
      </h3>
      <CommentForm addComment={handleAddComment} status={status} />
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          editedComment={editedComment}
          setEditedComment={setEditedComment}
          comment={comment}
          user={user}
          deleteComment={handleDeleteComment}
          editComment={handleUpdateComment}
          status={status}
        />
      ))}
    </div>
  );
});

export default CommentsList;
