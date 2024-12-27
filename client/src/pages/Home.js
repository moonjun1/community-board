import '../styles/Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">커뮤니티에 오신 것을 환영합니다</h1>
            <p className="home-subtitle">여러분의 생각을 나누고 다른 사람들과 소통하세요 </p>
            <div className="feature-grid">
                <div className="feature-card">
                    <h3 className="feature-title">공유하기</h3>
                    <p className="feature-description">커뮤니티와 아이디어를 공유하세요</p>
                </div>
                <div className="feature-card">
                    <h3 className="feature-title">소통하기</h3>
                    <p className="feature-description">댓글과 토론을 통해 다른 사람들과 교류하세요</p>
                </div>
                <div className="feature-card">
                    <h3 className="feature-title">소통하기</h3>
                    <p className="feature-description">다양한 주제와 관점을 탐색해보세요</p>
                </div>
            </div>
        </div>
    );
};

export default Home;