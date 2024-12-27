import { useState } from 'react';
import { comments } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
const CommentForm = ({ postId, setComments }) => {
    const [content, setContent] = useState('');
    const { user } = useAuth();
    const { addNotification } = useNotification();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await comments.create({ content, post_id: postId });
            setComments(prev => [response.data, ...prev]);
            setContent('');
            addNotification('Comment added successfully!');
        } catch (error) {
            console.error('Failed to create comment:', error);
            addNotification('Failed to add comment. Please try again.');
        }
    };

    if (!user) return null;

    return (
        <form onSubmit={handleSubmit} className="mb-4">
      <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
          rows="3"
          placeholder="Write a comment..."
          required
      />
            <button
                type="submit"
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Submit
            </button>
        </form>
    );
};

export default CommentForm;