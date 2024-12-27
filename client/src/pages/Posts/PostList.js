import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../../api';
import SearchBar from '../../components/search/SearchBar';
import Pagination from '../../components/Pagination';
import '../../styles/PostList.css';

const PostList = () => {
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPosts = async (page = 1, searchParams = {}) => {
        try {
            setLoading(true);
            const response = await posts.getAll({ page, limit: 10, ...searchParams });
            setPostList(response.data.posts);
            setTotalPages(Math.ceil(response.data.total / 10));
        } catch (err) {
            setError('Failed to load posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const handleSearch = (searchParams) => {
        setCurrentPage(1);
        fetchPosts(1, searchParams);
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="post-container">
            <div className="post-header">
                <h2 className="post-title">게시글 목록</h2>
                <Link to="/posts/create" className="create-post-button">
                    새 글 작성
                </Link>
            </div>

            <div className="search-section">
                <SearchBar onSearch={handleSearch} />
            </div>

            <div className="post-list">
                {postList.map(post => (
                    <div key={post.id} className="post-card">
                        <Link to={`/posts/${post.id}`}>
                            <h3 className="post-card-title">{post.title}</h3>
                        </Link>
                        <div className="post-card-meta">
                            <span>By {post.username}</span>
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="post-card-content">
                            {post.content.substring(0, 150)}...
                        </p>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default PostList;