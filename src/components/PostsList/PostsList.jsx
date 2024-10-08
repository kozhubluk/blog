import {useCallback, useEffect, useState} from "react";
import {postStore} from "../../store/PostsStore";
import {observer} from "mobx-react-lite";
import PostItem from "../PostItem/PostItem";
import styles from './PostsList.module.scss'
import PostItemSkeleton from "../PostItem/PostItemSkeleton";
import {useAuth} from "../../providers/AuthProvider";
import Modal from "../Modal/Modal";
import PostForm from "../PostForm/PostForm";
import {useModal} from "../../hooks/useModal";

const PostsList = observer(() => {
    const {getPosts, posts, error, status, deletePost, updatePost} = postStore;
    const {user} = useAuth();

    const [editedPost, setEditedPost] = useState(null);
    const {active, close, open} = useModal();

    const editPost = async (title, content, image) => {
        if (editedPost) {
            await updatePost(editedPost.id, {title, content, image, userId: user.id});
            if (postStore.status === 'resolve') close();
        }
    }

    const onEditPost = useCallback((post) => {
        setEditedPost(post);
        open();
    }, [])

    useEffect(() => {
        getPosts();
    }, []);

    if (status === 'pending' && !posts.length) return <div className={styles.posts}>
        {Array(8).fill(null).map((_, i) => <PostItemSkeleton key={i}/>)}
    </div>

    return <div className={styles.posts}>

        {posts.length === 0
                    ? null
                    : posts.map(post => <PostItem key={post.id} post={post} user={user} onEdit={onEditPost} onDelete={deletePost}/>)
                }
        <Modal isOpen={active} onClose={close}>
            <PostForm submitAction={editPost} title={editedPost?.title} content={editedPost?.content} image={editedPost?.image} error={error} editMode={true}/>
        </Modal>
    </div>
    // return <div className={styles.ArticleList}>
    //     {posts.length === 0
    //         ? null
    //         : posts.map(post => <PostItem key={post.id}/>)
    //     }
    // </div>
});

export default PostsList;