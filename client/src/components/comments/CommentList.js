import { useEffect, useState } from 'react';
import { comments } from '../../api';
import { useAuth } from '../../context/AuthContext';
import CommentForm from './CommentForm';

const CommentList = ({ postId }) => {
    const [commentList, setCommentList] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchComments = async () => {
            const response = await comments.getByPost(postId);
            setCommentList(response.data);
        };
        fetchComments();
    }, [postId]);

    const handleDelete = async (commentId) => {
        await comments.delete(commentId);
        setCommentList(prev => prev.filter(comment => comment._id !== commentId));
    };

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Comments</h2>
            <CommentForm postId={postId} setComments={setCommentList} />
            <div className="space-y-4 mt-4">
                {commentList.map(comment => (
                    <div key={comment._id} className="border p-4 rounded">
                        <p>{comment.content}</p>
                        <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                {new Date(comment.created_at).toLocaleDateString()}
              </span>
                            {user?.id === comment.user_id && (
                                <button
                                    onClick={() => handleDelete(comment._id)}
                                    className="text-red-500 text-sm"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentList;