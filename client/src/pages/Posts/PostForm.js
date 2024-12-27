import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import { posts } from '../../api';

const PostForm = ({ initialData }) => {
    const [formData, setFormData] = useState(initialData || {
        title: '',
        content: '',
        category: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (initialData) {
                await posts.update(initialData.id, formData);
                addNotification('Post updated successfully!');
            } else {
                await posts.create(formData);
                addNotification('New post created successfully!');
            }
            navigate('/posts');
        } catch (error) {
            setError('Failed to save post');
            addNotification('Failed to save post. Please try again.');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
                <label className="block mb-2">제목</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">카테고리</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">카테고리 선택</option>
                    <option value="general">일반</option>
                    <option value="question">질문</option>
                    <option value="discussion">토론</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-2">내용</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows="6"
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="flex gap-4">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    {initialData ? '수정하기' : '작성하기'}
                </button>
                <button
                    type="button"
                    onClick={() => navigate('/posts')}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    취소
                </button>
            </div>
        </form>
    );
};

export default PostForm;