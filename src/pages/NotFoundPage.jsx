import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './NotFoundPage.css';

function NotFoundPage() {
    return (
        <>
            <Helmet>
                <title>페이지를 찾을 수 없습니다 | 베리굿초콜릿</title>
            </Helmet>

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
