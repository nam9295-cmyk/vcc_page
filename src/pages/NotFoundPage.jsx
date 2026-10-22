import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
    return (
        <>

            <main className="not-found-page">
                <div className="not-found-content">
                    <h1>404</h1>
                    <p>페이지를 찾을 수 없습니다</p>
                    <Link to="/" className="home-btn">홈으로 돌아가기</Link>
                </div>
            </main>
        </>
    );
}

export default NotFoundPage;
