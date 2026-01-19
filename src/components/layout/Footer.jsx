import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-links">
                <Link to="/about">회사소개</Link>
                <Link to="/business-story">브랜드 스토리</Link>
                <Link to="/privacy">개인정보처리방침</Link>
                <Link to="/terms">이용약관</Link>
            </div>
            <p className="copyright">
                © 2026 Very Good Chocolate. All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;
