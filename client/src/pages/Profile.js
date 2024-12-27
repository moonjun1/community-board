import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { posts } from '../api';
import '../styles/Profile.css';

const Profile = () => {
    const { user } = useAuth();
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await posts.getAll({ userId: user.id });
                setUserPosts(response.data.posts);
            } catch (error) {
                console.error('Failed to fetch user posts:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchUserPosts();
    }, [user]);

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1 className="profile-title">내 프로필</h1>
                <div className="profile-info">
                    <div className="info-item">
                        <span className="info-label">사용자 이름:</span>
                        <span>{user?.username}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">이메일:</span>
                        <span>{user?.email}</span>
                    </div>
                </div>
            </div>

            <div className="posts-section">
                <h2 className="posts-title">내가 쓴 글</h2>
                {userPosts.length > 0 ? (
                    userPosts.map(post => (
                        <div key={post.id} className="post-item">
                            <Link to={`/posts/${post.id}`} className="post-title">
                                {post.title}
                            </Link>
                            <div className="post-meta">
                                Posted on {new Date(post.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>아직 작성한 글이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;