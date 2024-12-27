# 🌟 Community Board Project

<p align="center">
 <img src="project-logo.png" alt="project-logo" width="200">
</p>

## 📝 프로젝트 소개
> React와 Node.js를 활용한 커뮤니티 게시판입니다. 사용자들이 게시글을 작성하고 댓글을 통해 소통할 수 있습니다.

## ✨ 주요 기능
- 💫 회원가입/로그인 기능
- 📋 게시글 CRUD
- 💭 댓글 작성 및 관리
- 🔍 게시글 검색 기능
- 👤 프로필 관리

## 🛠 기술 스택

### Frontend
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=React Router&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>

### Backend
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/>
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/>
<img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSON Web Tokens&logoColor=white"/>

## 🚀 실행 방법

### 1. 서버 실행
```bash
cd server
npm install
npm run dev

community-board/
├── client/
│   ├── public/
│   └── src/
│       ├── api/
│       │   └── index.js
│       ├── components/
│       │   ├── auth/
│       │   │   ├── LoginForm.js
│       │   │   └── RegisterForm.js
│       │   ├── layout/
│       │   │   ├── Header.js
│       │   │   ├── Footer.js
│       │   │   └── Navigation.js
│       │   ├── posts/
│       │   │   └── PostForm.js
│       │   ├── comments/
│       │   │   ├── CommentList.js
│       │   │   └── CommentForm.js
│       │   ├── search/
│       │   │   └── SearchBar.js
│       │   ├── Notification.js
│       │   ├── Pagination.js
│       │   └── ProtectedRoute.js
│       ├── context/
│       │   ├── AuthContext.js
│       │   └── NotificationContext.js
│       ├── pages/
│       │   ├── Posts/
│       │   │   ├── PostList.js
│       │   │   ├── PostDetail.js
│       │   │   ├── CreatePost.js
│       │   │   └── EditPost.js
│       │   ├── Home.js
│       │   ├── Login.js
│       │   ├── Register.js
│       │   └── Profile.js
│       ├── styles/
│       │   ├── Auth.css
│       │   ├── Header.css
│       │   ├── Navigation.css
│       │   ├── PostList.css
│       │   └── PostDetail.css
│       ├── App.js
│       └── index.js
└── server/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── schema.sql
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── commentController.js
│   ├── models/
│   │   └── mongodb/
│   │       ├── comments.js
│   │       └── notifications.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── posts.js
│   │   └── comments.js
│   └── index.js
├── .env
└── package.json


# 💫 주요 구현 기능

## 🔐 사용자 인증
### `회원가입 & 로그인`
- JWT 기반 토큰 인증
- 비밀번호 암호화 (bcrypt)
- 로그인 상태 유지
- 소셜 로그인 (준비중)

## 📝 게시판
### `게시글 관리`
- 게시글 작성/수정/삭제
- 이미지 업로드 지원
- 카테고리 분류
- 조회수 기능

### `검색 & 필터링`
- 제목/내용 검색 기능
- 카테고리별 필터링
- 작성자 검색
- 기간별 검색

### `페이지네이션`
- 페이지당 10개 게시글
- 페이지 번호 네비게이션
- 이전/다음 페이지 이동

## 💬 댓글
### `댓글 시스템`
- 실시간 댓글 작성/수정/삭제
- 대댓글 지원
- MongoDB를 활용한 효율적인 데이터 관리

## 👤 사용자 프로필
### `프로필 관리`
- 사용자 정보 수정
- 작성 게시글 목록
- 작성 댓글 목록
- 활동 내역 조회

## 🎨 UI/UX
### `반응형 디자인`
- 모바일/태블릿/데스크톱 지원
- 직관적인 사용자 인터페이스
- 모던한 디자인
- 다크모드 지원 (준비중)

## 🔔 알림
### `실시간 알림`
- 새 댓글 알림
- 답글 알림
- 읽음/안읽음 표시
- 알림 센터
