import styles from './CommentsForm.module.scss';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';

const CommentForm = observer((props) => {
  const { addComment, status } = props;
  const [comment, setComment] = useState('');
  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addComment(comment);
    if (status === 'resolve') setComment('');
  };

  return (
    <>
      <form className={styles.writing} onSubmit={handleSubmit}>
        <textarea
          value={comment}
          placeholder="Введите свой комментарий..."
          onChange={handleComment}
        />
        <input type="submit" value="Отправить" disabled={status === 'pending' || !comment.trim()} />
      </form>
    </>
  );
});

export default CommentForm;
