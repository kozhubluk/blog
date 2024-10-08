import styles from './CommentItem.module.scss'
import User from "../User/User";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";

const CommentItem = observer((props) => {
    const {comment, editComment, deleteComment, status, user, editedComment, setEditedComment} = props;

    const [commentValue, setCommentValue] = useState(comment?.text || '');

    useEffect(() => {
        setCommentValue(comment.text);
    }, [comment, editedComment]);

    const onEditClick = () => {
        setEditedComment(comment.id);
    }

    const onCancelClick = () => {
        setEditedComment(0);
        setCommentValue(comment?.text || '');
    }

    const onChangeComment = (e) => {
        setCommentValue(e.target.value);
    }

    const handleDelete = () => {
        deleteComment(comment.id);
    }

    const handleEdit = async () => {
        await editComment(comment.id, commentValue.trim());
        if (status === 'resolve') setEditedComment(0);
    }

    return <div className={styles.comment}>
        <User user={comment.user}/>
        {editedComment !== comment.id ? <>
            <p>{comment.text}</p>
                {comment.userId === user.id && <div className={styles['group-button']}>
                    <button onClick={onEditClick}>
                        Изменить
                    </button>
                    <button onClick={handleDelete}>
                        Удалить
                    </button>
                </div>}
        </>
            : <>
                <textarea placeholder='Введите комментарий...' value={commentValue} onChange={onChangeComment}/>
                <div className={styles['group-button']}>
                    <button onClick={handleEdit} disabled={status === 'pending' || !commentValue.trim()}>
                        Сохранить
                    </button>
                    <button onClick={onCancelClick}>
                        Отмена
                    </button>
                </div>
            </>}


    </div>
})

export default CommentItem;