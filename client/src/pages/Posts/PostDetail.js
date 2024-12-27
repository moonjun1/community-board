import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { posts, comments } from '../../api';
import CommentList from '../../components/comments/CommentList';
import '../../styles/PostDetail.css';

const PostDetail = () => {
    const [post, setPost] = useState(null);
    const [commentList, setCommentList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postResponse, commentsResponse] = await Promise.all([
                    posts.getOne(id),
                    comments.getByPost(id)
                ]);
                setPost(postResponse.data);
                setCommentList(commentsResponse.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleDelete = async () => {
        try {
            await posts.delete(id);
            navigate('/posts');
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (!post) return <div className="error-message">Post not found</div>;

    return (
        <div className="post-detail-container">
            <div className="post-detail-header">
                <h1 className="post-detail-title">{post.title}</h1>
                <div className="post-detail-meta">
                    <span>작성자 : {post.username}</span>
                    <span>작성일 :{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="post-detail-content">
                {post.content}
            </div>

            {user?.id === post.user_id && (
                <div className="post-actions">
                    <button
                        onClick={() => navigate(`/posts/${id}/edit`)}
                        className="edit-button"
                    >
                        수정
                    </button>
                    <button
                        onClick={handleDelete}
                        className="delete-button"
                    >
                        삭제
                    </button>
                </div>
            )}

            <div className="comments-section">
                <h2 className="comments-title">댓글</h2>
                <CommentList postId={id} />
            </div>
        </div>
    );
};

export default PostDetail;