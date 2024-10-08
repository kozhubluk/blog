import styles from './CommentsList.module.scss';
import { commentsStore } from '../../store/CommentsStore';
import { useCallback, useEffect, useState } from 'react';
import CommentItem from '../CommentItem/CommentItem';
import { observer } from 'mobx-react-lite';
import CommentForm from '../CommentForm/CommentForm';
import { useAuth } from '../../providers/AuthProvider';
import CommentItemSkeleton from '../CommentItem/CommentItemSkeleton';

const CommentsList = observer((props) => {
  const { id: postId } = props;
  const { user } = useAuth();
  const { getComments, addComment, deleteComment, updateComment, status, comments } = commentsStore;
  const [editedComment, setEditedComment] = useState(0);

  useEffect(() => {
    getComments(postId);
  }, [getComments, postId]);

  const handleAddComment = useCallback(
    async (text) => {
      await addComment({
        user,
        postId,
        text,
      });
    },
    [addComment, postId, user],
  );

  const handleUpdateComment = useCallback(
    async (id, text) => {
      await updateComment(id, {
        userId: user.id,
        postId,
        text,
      });
    },
    [postId, updateComment, user.id],
  );

  const handleDeleteComment = useCallback(
    (id) => {
      deleteComment(id);
    },
    [deleteComment],
  );

  const handleFormFocus = useCallback(() => {
    setEditedComment(0);
  }, [setEditedComment]);

  return (
    <div className={styles.comments}>
      <h3>
        Комментарии <span className={styles.counter}>{comments.length}</span>
      </h3>
      <CommentForm
        addComment={handleAddComment}
        status={commentsStore.status}
        onFocus={handleFormFocus}
      />
      {status === 'pending' && comments.length === 0
        ? Array(4)
            .fill(null)
            .map((_, i) => <CommentItemSkeleton key={i} />)
        : comments
            .map((comment) => (
              <CommentItem
                key={comment.id}
                editedComment={editedComment}
                setEditedComment={setEditedComment}
                comment={comment}
                user={user}
                deleteComment={handleDeleteComment}
                editComment={handleUpdateComment}
                status={commentsStore.status}
              />
            ))
            .reverse()}
    </div>
  );
});

export default CommentsList;
