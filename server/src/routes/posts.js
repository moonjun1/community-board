const express = require('express');
const router = express.Router();
const { getPosts, createPost, getPostById, updatePost, deletePost } = require('../controllers/postController');
const authMiddleware = require('../middleware/auth');

router.get('/', getPosts);
router.post('/', authMiddleware, createPost);
router.get('/:id', getPostById);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;