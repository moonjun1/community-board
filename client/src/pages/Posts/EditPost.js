import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { posts } from '../../api';
import PostForm from './PostForm';

const EditPost = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await posts.getOne(id);
            setPost(response.data);
        };
        fetchPost();
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
            <PostForm initialData={post} />
        </div>
    );
};

export default EditPost;