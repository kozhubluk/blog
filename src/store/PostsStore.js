import { makeAutoObservable, runInAction } from 'mobx';
import { apiInstance } from '../utils/api';

class PostsStore {
  posts = [];
  post = {};
  status = 'idle';
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  getPosts = async () => {
    this.status = 'pending';
    this.error = null;

    try {
      const response = await apiInstance.get('posts', {
        params: { _embed: 'user' },
      });
      runInAction(() => {
        this.posts = response.data;
        this.status = 'resolve';
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.status = 'reject';
      });
    }
  };

  getPostById = async (id) => {
    this.status = 'pending';
    this.error = null;

    try {
      const response = await apiInstance.get(`posts/${id}`, {
        params: { _embed: 'user' },
      });
      runInAction(() => {
        this.post = response.data;
        this.status = 'resolve';
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.status = 'reject';
      });
    }
  };

  addPost = async (newPost) => {
    this.status = 'pending';
    const { user, ...body } = newPost;
    body.userId = user.id;

    try {
      const response = await apiInstance.post('posts', body);
      runInAction(() => {
        const post = response.data;
        this.posts.push({ ...post, user });
        this.status = 'resolve';
        this.error = null;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
        this.status = 'reject';
      });
    }
  };

  updatePost = async (id, newPost) => {
    this.status = 'pending';
    this.error = null;

    try {
      const response = await apiInstance.put(`posts/${id}`, newPost);
      runInAction(() => {
        const post = response.data;
        this.posts = this.posts.map((item) =>
          item.id === id ? { ...post, user: item.user } : item,
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

  deletePost = async (id) => {
    this.status = 'pending';
    this.error = null;

    try {
      await apiInstance.delete(`posts/${id}`);
      runInAction(() => {
        this.posts = this.posts.filter((item) => item.id !== id);
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

export const postStore = new PostsStore();
