const { pool } = require('../config/db');

const getPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const searchTerm = req.query.searchTerm;
        const category = req.query.category;

        let query = `
           SELECT p.*, u.username 
           FROM posts p
           JOIN users u ON p.user_id = u.id
       `;
        let countQuery = 'SELECT COUNT(*) as total FROM posts p';
        let params = [];

        if (searchTerm || category) {
            query += ' WHERE';
            countQuery += ' WHERE';
            if (searchTerm) {
                query += ' (p.title LIKE ? OR p.content LIKE ?)';
                countQuery += ' (p.title LIKE ? OR p.content LIKE ?)';
                params.push(`%${searchTerm}%`, `%${searchTerm}%`);
            }
            if (category) {
                if (searchTerm) {
                    query += ' AND';
                    countQuery += ' AND';
                }
                query += ' p.category = ?';
                countQuery += ' p.category = ?';
                params.push(category);
            }
        }

        query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const [posts] = await pool.query(query, params);
        const [totalRows] = await pool.query(countQuery, params.slice(0, -2));
        const total = totalRows[0].total;

        res.json({
            posts,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createPost = async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const userId = req.user.id;
        const [result] = await pool.query(
            'INSERT INTO posts (title, content, category, user_id) VALUES (?, ?, ?, ?)',
            [title, content, category, userId]
        );
        res.status(201).json({ message: "Post created", id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const [posts] = await pool.query(
            'SELECT p.*, u.username FROM posts p JOIN users u ON p.user_id = u.id WHERE p.id = ?',
            [req.params.id]
        );
        if (posts.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(posts[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const [result] = await pool.query(
            'UPDATE posts SET title = ?, content = ?, category = ? WHERE id = ? AND user_id = ?',
            [title, content, category, req.params.id, req.user.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Post not found or unauthorized" });
        }
        res.json({ message: "Post updated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM posts WHERE id = ? AND user_id = ?',
            [req.params.id, req.user.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Post not found or unauthorized" });
        }
        res.json({ message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost
};