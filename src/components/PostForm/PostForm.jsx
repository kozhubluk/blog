import {useEffect, useState} from "react";
import styles from './PostForem.module.scss';
import {observer} from "mobx-react-lite";

const PostForm = observer((props) => {
    const {submitAction, title, content, image, error, status, editMode = false} = props;

    const [formValues, setFormValues] = useState({
        title: title || '',
        content: content || '',
        image: image || ''
    });

    useEffect(() => {
        if (editMode) {
            setFormValues({ title: title || '', content: content || '', image: image || '' });
        }
    }, [title, content, image]);

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, content, image } = formValues;
        await submitAction(title, content, image);
        if (!error && !editMode) {
            setFormValues({ title: '', content: '', image: '' });
        }
    }

    return <form className={styles.form} onSubmit={handleSubmit}>
        <h2>{editMode ? "Редактировать пост" : "Добавить новый пост"}</h2>
        <label htmlFor='title'>Название <b>*</b></label>
        <input name='title' type='text' value={formValues.title} placeholder='Ввдеите заголовок поста...'
               onChange={handleChanges}/>
        <label htmlFor='content'>Содержимое <b>*</b></label>
        <textarea name='content' value={formValues.content} placeholder='Введите содержание поста...'
                  onChange={handleChanges}/>
        <label htmlFor='image'>Изображение</label>
        <input name='image' type='text' value={formValues.image} placeholder='Добавьте ссылку на изображение...' onChange={handleChanges}/>
        <p className={styles.error}>{!!error && error.message}</p>
        <input type='submit' value='Отправить' disabled={!formValues.title.trim() || !formValues.content.trim() || status === 'pending'}/>
    </form>
});

export default PostForm;