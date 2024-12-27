const mysql = require('mysql2');
const mongoose = require('mongoose');
require('dotenv').config();

// MySQL 연결
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 연결 테스트 추가
pool.getConnection((err, connection) => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('MySQL connected successfully');
        connection.release();
    }
});

// MongoDB 연결
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = { pool: pool.promise(), connectMongoDB };