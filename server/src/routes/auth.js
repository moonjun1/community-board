const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// 회원가입 및 로그인 경로에 컨트롤러 연결
router.post('/register', register);
router.post('/login', login);

module.exports = router;