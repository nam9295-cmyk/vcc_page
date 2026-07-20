import { Link } from 'react-router-dom';
import './Footer.css';

const INSTAGRAM_URL = 'https://www.instagram.com/verygood_chocolate/';
const CAKE_URL = 'https://cake.verygood-chocolate.com';
const MAP_URL = 'https://map.naver.com/p/entry/place/1069379954';

function Footer() {
    return (
        <div className="footer-reveal-shell">
            <footer className="site-footer">
                <div className="footer-inner">
                    <div className="footer-primary">
                        <section className="footer-cake-callout" aria-labelledby="footer-cake-title">
                            <p className="footer-eyebrow">VERY GOOD CAKE</p>
                            <a
                                className="footer-cake-order"
                                href={CAKE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <h2 id="footer-cake-title">
                                    케이크 주문하기 <span aria-hidden="true">↗</span>
                                </h2>
                                <span className="footer-cake-gallery" aria-hidden="true">
                                    <img
                                        src="/footer-cakes/cheesecake.webp"
                                        alt=""
                                        width="1080"
                                        height="1012"
                                        loading="lazy"
                                    />
                                    <img
                                        src="/footer-cakes/pave-side.webp"
                                        alt=""
                                        width="1080"
                                        height="1012"
                                        loading="lazy"
                                    />
                                    <img
                                        src="/footer-cakes/pound-side.webp"
                                        alt=""
                                        width="1080"
                                        height="1012"
                                        loading="lazy"
                                    />
                                </span>
                            </a>
                        </section>

                        <nav className="footer-nav" aria-label="푸터 메뉴">
                            <div className="footer-nav-group">
                                <p className="footer-nav-title">EXPLORE</p>
                                <Link to="/menu">메뉴</Link>
                                <Link to="/business-story">브랜드 스토리</Link>
                                <Link to="/blog">스토리</Link>
                            </div>

                            <div className="footer-nav-group">
                                <p className="footer-nav-title">CONNECT</p>
                                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                                    Instagram <span aria-hidden="true">↗</span>
                                </a>
                                <a href={MAP_URL} target="_blank" rel="noopener noreferrer">
                                    오시는 길 <span aria-hidden="true">↗</span>
                                </a>
                                <a href="/#contact">문의하기</a>
                            </div>
                        </nav>
                    </div>

                    <Link className="footer-wordmark" to="/" aria-label="very good 홈">
                        very good
                    </Link>

                    <div className="footer-bottom">
                        <div className="footer-business-info" aria-label="사업자 정보">
                            <p>
                                <span>주식회사 베리굿</span>
                                <span>대표 천정민</span>
                            </p>
                            <p>
                                <span>사업자등록번호 850-81-02950</span>
                                <span>통신판매업신고 2023-DaeguDalseo-1940</span>
                            </p>
                            <address>대구광역시 수성구 상록로11길 13 1층 베리굿초콜릿</address>
                        </div>

                        <div className="footer-legal">
                            <div className="footer-legal-links">
                                <Link to="/about">회사소개</Link>
                                <Link to="/privacy">개인정보처리방침</Link>
                                <Link to="/terms">이용약관</Link>
                            </div>
                            <p className="copyright">
                                © 2026 Very Good Chocolate.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
