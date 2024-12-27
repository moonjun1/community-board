const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { pool, connectMongoDB } = require('./config/db');

// 라우터 import
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

dotenv.config();
const app = express();

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우터 연결
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);

const PORT = process.env.PORT || 5000;

connectMongoDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});