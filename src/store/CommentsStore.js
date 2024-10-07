import {makeAutoObservable, runInAction} from "mobx";
import {apiInstance} from "../utils/api";

class CommentsStore {
    comments = [];
    status = 'idle';
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    getComments = async (postId) => {
        this.status = 'pending';
        this.error = null;

        try {
            const response = await apiInstance.get('comments', {params: {postId}});
            runInAction(() => {
                this.comments = response.data;
                this.status = 'resolve';
            });
        } catch (error) {
            runInAction(() => {
                this.error = error;
                this.status = 'reject';
            });
        }
    }

    addComment = async (newComment) => {
        this.status = 'pending';
        this.error = null;

        try {
            const response = await apiInstance.post('comments', newComment);
            runInAction(() => {
                const comment = response.data;
                this.comments.push(comment);
                this.status = 'resolve';
            });
        } catch (error) {
            runInAction(() => {
                this.status = 'reject';
                this.error = error;
            });
        }
    }

    updateComment = async (id, newComment) => {
        this.status = 'pending';
        this.error = null;

        try {
            const response = await apiInstance.put(`comments/${id}`, newComment);
            runInAction(() => {
                const comment = response.data;
                this.comments = this.comments.map(item => item.id === id ? comment : item);
                this.status = 'resolve';
            });
        } catch (error) {
            runInAction(() => {
                this.status = 'reject';
                this.error = error;
            });
        }
    }

    deleteComment = async (id) => {
        this.status = 'pending';
        this.error = null;

        try {
            const response = await apiInstance.delete(`comments/${id}`);
            runInAction(() => {
                this.posts = this.posts.filter(item => item.id !== id);
                this.status = 'resolve';
            });
        } catch (error) {
            runInAction(() => {
                this.status = 'reject';
                this.error = error;
            });
        }
    }
}