import { Link, useLocation } from 'react-router-dom';
import '../../styles/Navigation.css';

const Navigation = () => {
    const location = useLocation();

    return (
        <nav className="navigation">
            <div className="nav-container">
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link
                            to="/"
                            className={`${location.pathname === '/' ? 'active' : ''}`}
                        >
                            홈
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/posts"
                            className={`${location.pathname === '/posts' ? 'active' : ''}`}
                        >
                            게시글
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/posts/create"
                            className={`${location.pathname === '/posts/create' ? 'active' : ''}`}
                        >
                            글쓰기
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;