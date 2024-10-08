import { makeAutoObservable, runInAction } from 'mobx';
import { apiInstance } from '../utils/api';

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
      const response = await apiInstance.get('comments', { params: { postId, _embed: 'user' } });
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
  };

  addComment = async (newComment) => {
    this.status = 'pending';
    this.error = null;
    const { user, ...body } = newComment;

    try {
      const response = await apiInstance.post(`comments`, { ...body, userId: user.id });
      runInAction(() => {
        const comment = response.data;
        this.comments.push({ ...comment, user: user });
        this.status = 'resolve';
      });
    } catch (error) {
      runInAction(() => {
        this.status = 'reject';
        this.error = error;
      });
    }
  };

  updateComment = async (id, newComment) => {
    this.status = 'pending';
    this.error = null;

    try {
      const response = await apiInstance.put(`comments/${id}`, newComment);
      runInAction(() => {
        const comment = response.data;
        this.comments = this.comments.map((item) =>
          item.id === id ? { ...comment, user: item.user } : item,
        );
        this.status = 'resolve';
      });
    } catch (error) {
      runInAction(() => {
        this.status = 'reject';
        this.error = error;
      });
    }
  };

  deleteComment = async (id) => {
    this.status = 'pending';
    this.error = null;

    try {
      const response = await apiInstance.delete(`comments/${id}`);
      runInAction(() => {
        this.comments = this.comments.filter((item) => item.id !== id);
        this.status = 'resolve';
      });
    } catch (error) {
      runInAction(() => {
        this.status = 'reject';
        this.error = error;
      });
    }
  };
}

export const commentsStore = new CommentsStore();
