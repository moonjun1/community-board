const { pool } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        console.log('Registration request received:', req.body);

        const { email, password, username } = req.body;
        console.log('Extracted data:', { email, username });

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed successfully');

        const query = 'INSERT INTO users (email, password, username) VALUES (?, ?, ?)';
        console.log('Executing query:', query);

        const [result] = await pool.query(query, [email, hashedPassword, username]);
        console.log('Query result:', result);

        res.status(201).json({
            message: "User registered successfully",
            user: { id: result.insertId, email, username },
            token: jwt.sign(
                { id: result.insertId, email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            )
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isValid = await bcrypt.compare(password, users[0].password);
        if (!isValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: users[0].id, email: users[0].email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: {
                id: users[0].id,
                email: users[0].email,
                username: users[0].username
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login };