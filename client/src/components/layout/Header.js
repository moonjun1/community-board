import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Header.css';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">커뮤니티</Link>
                <div className="nav-links">
                    {user ? (
                        <>
                            <span className="user-info">환영합니다, {user.username}</span>
                            <Link to="/profile" className="nav-link">프로필</Link>
                            <button onClick={logout} className="logout-button">로그아웃</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">로그인</Link>
                            <Link to="/register" className="nav-link">회원가입</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;