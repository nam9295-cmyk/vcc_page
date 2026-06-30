import { Link } from 'react-router-dom';
import './GranolaSection.css';

function GranolaSection() {
    return (
        <section className="granola-showcase" aria-labelledby="granola-title">
            <h2 id="granola-title" className="billboard-word granola-display-word">GRANOLA</h2>

            <div className="granola-content">
                <Link
                    className="showcase-image-link granola-image-link"
                    to="/menu/granola"
                    aria-label="그래놀라 메뉴 보기"
                >
                    <img src="/hero/hero_granola.webp" alt="카카오 그래놀라" loading="lazy" />
                    <span className="showcase-tag granola-product-tag">GRANOLA</span>
                </Link>
                <p>CACAO · HANDMADE · BOTTLE</p>
            </div>
        </section>
    );
}

export default GranolaSection;
