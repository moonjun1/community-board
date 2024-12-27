import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const auth = {
    login: (data) => api.post('/auth/login', data),
    register: (data) => api.post('/auth/register', data)
};

export const posts = {
    getAll: () => api.get('/posts'),
    getOne: (id) => api.get(`/posts/${id}`),
    create: (data) => api.post('/posts', data),
    update: (id, data) => api.put(`/posts/${id}`, data),
    delete: (id) => api.delete(`/posts/${id}`)
};

export const comments = {
    getByPost: (postId) => api.get(`/comments/post/${postId}`),
    create: (data) => api.post('/comments', data),
    update: (id, data) => api.put(`/comments/${id}`, data),
    delete: (id) => api.delete(`/comments/${id}`)
};