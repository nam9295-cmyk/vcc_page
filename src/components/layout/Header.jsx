import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };

    const closeMobileNav = () => {
        setIsMobileNavOpen(false);
    };

    return (
        <>
            <header className={`site-header ${isVisible ? 'visible' : ''}`}>
                <button className="hamburger-menu" onClick={toggleMobileNav} aria-label="메뉴">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className="header-logo">
                    <Link to="/">
                        <img src="/logo_b.png" alt="베리굿초콜릿 로고" />
                    </Link>
                </div>
                <div className="header-spacer"></div>
            </header>

            {/* 모바일 사이드 메뉴 */}
            <nav className={`mobile-nav ${isMobileNavOpen ? 'open' : ''}`}>
                <button className="close-menu" onClick={closeMobileNav}>×</button>
                <ul>
                    <li><Link to="/#signature" onClick={closeMobileNav}>SIGNATURE</Link></li>
                    <li><Link to="/#detox-tea" onClick={closeMobileNav}>DETOX TEA</Link></li>
                    <li><Link to="/#coffee" onClick={closeMobileNav}>COFFEE</Link></li>
                    <li><Link to="/#icecream" onClick={closeMobileNav}>ICECREAM</Link></li>
                    <li><Link to="/blog" onClick={closeMobileNav}>BLOG</Link></li>
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
