const express = require('express');
const router = express.Router();
const { getCommentsByPost, createComment, updateComment, deleteComment } = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth');

router.get('/post/:postId', getCommentsByPost);
router.post('/', authMiddleware, createComment);
router.put('/:id', authMiddleware, updateComment);
router.delete('/:id', authMiddleware, deleteComment);

module.exports = router;