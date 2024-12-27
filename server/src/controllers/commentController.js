const Comment = require('../models/mongodb/comments');

const getCommentsByPost = async (req, res) => {
    try {
        const comments = await Comment.find({ post_id: req.params.postId })
            .sort({ created_at: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createComment = async (req, res) => {
    try {
        const { content, post_id } = req.body;
        const comment = new Comment({
            content,
            post_id,
            user_id: req.user.id
        });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findOneAndUpdate(
            { _id: req.params.id, user_id: req.user.id },
            { content: req.body.content },
            { new: true }
        );
        if (!comment) {
            return res.status(404).json({ message: "Comment not found or unauthorized" });
        }
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findOneAndDelete({
            _id: req.params.id,
            user_id: req.user.id
        });
        if (!comment) {
            return res.status(404).json({ message: "Comment not found or unauthorized" });
        }
        res.json({ message: "Comment deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCommentsByPost,
    createComment,
    updateComment,
    deleteComment
};