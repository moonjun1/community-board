import PostForm from './PostForm';

const CreatePost = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">새 글 작성</h1>
            <PostForm />
        </div>
    );
};

export default CreatePost;