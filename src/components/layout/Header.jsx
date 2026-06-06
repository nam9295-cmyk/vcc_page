import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    const toggleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };

    const closeMobileNav = () => {
        setIsMobileNavOpen(false);
    };

    return (
        <>
            <header className="site-header">
                <Link className="header-logo" to="/" aria-label="very good 홈">
                    <span>very good</span>
                </Link>
                <button className="hamburger-menu" onClick={toggleMobileNav} aria-label="메뉴 열기">
                    <span className="menu-text">MENU</span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </header>

            <nav className={`mobile-nav ${isMobileNavOpen ? 'open' : ''}`}>
                <button className="close-menu" onClick={closeMobileNav} aria-label="메뉴 닫기">×</button>
                <ul>
                    <li><Link to="/menu" onClick={closeMobileNav}>MENU</Link></li>
                    <li><Link to="/about" onClick={closeMobileNav}>ABOUT</Link></li>
                    <li><Link to="/business-story" onClick={closeMobileNav}>STORY</Link></li>
                    <li><Link to="/blog" onClick={closeMobileNav}>BLOG</Link></li>
                    <li>
                        <a
                            href="https://order.verygood-chocolate.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeMobileNav}
                        >
                            ORDER
                        </a>
                    </li>
                </ul>
            </nav>
            <div
                className={`mobile-nav-overlay ${isMobileNavOpen ? 'visible' : ''}`}
                onClick={closeMobileNav}
            ></div>
        </>
    );
}

export default Header;
