import {useEffect} from "react";
import {postStore} from "../../store/PostsStore";
import {observer} from "mobx-react-lite";
import PostItem from "../PostItem/PostItem";
import styles from './PostsList.module.scss'
import PostItemSkeleton from "../PostItem/PostItemSkeleton";

const PostsList = observer(() => {
    const {getPosts, posts, error, status} = postStore;
    useEffect(() => {
        getPosts();
    }, []);

    if (status === 'pending') return <div className={styles.posts}>
        {Array(8).fill(null).map((_, i) => <PostItemSkeleton key={i}/>)}
    </div>

    return <div className={styles.posts}>
        {posts.length === 0
                    ? null
                    : posts.map(post => <PostItem key={post.id} post={post}/>)
                }
    </div>
    // return <div className={styles.ArticleList}>
    //     {posts.length === 0
    //         ? null
    //         : posts.map(post => <PostItem key={post.id}/>)
    //     }
    // </div>
});

export default PostsList;