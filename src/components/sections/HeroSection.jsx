import { Link } from 'react-router-dom';
import './HeroSection.css';

const featuredProducts = [
    {
        label: 'CHOCOLATE',
        caption: 'SIGNATURE CACAO DRINK',
        image: '/hero/hero_choco.webp',
        href: '/menu/chocolate'
    },
    {
        label: 'ADE',
        caption: 'FRESH FRUIT REFRESHER',
        image: '/hero/hero_ade.webp',
        href: '/menu/ade'
    },
    {
        label: 'DETOX TEA',
        caption: 'CACAO BLENDED TEA',
        image: '/hero/hero_detox.webp',
        href: '/menu/detox'
    }
];

function HeroSection() {
    return (
        <main id="main-content" role="main">
            <section className="hero-billboard" aria-labelledby="hero-title">
                <div className="featured-seal" aria-hidden="true">
                    <span>FEATURED</span>
                    <b>VCC</b>
                </div>

                <h1 id="hero-title" className="billboard-word hero-display-word">DRINK</h1>

                <div className="hero-products" aria-label="베리굿초콜릿 대표 메뉴">
                    {featuredProducts.map((product) => (
                        <article className="hero-product" key={product.label}>
                            <Link
                                className="showcase-image-link hero-image-link"
                                to={product.href}
                                aria-label={`${product.label} 메뉴 보기`}
                            >
                                <img src={product.image} alt={product.label} />
                                <span className="showcase-tag hero-product-tag">{product.label}</span>
                            </Link>
                            <p>{product.caption}</p>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default HeroSection;
