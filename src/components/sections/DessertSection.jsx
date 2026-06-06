import { Link } from 'react-router-dom';
import './DessertSection.css';

const dessertFeatures = [
    {
        label: 'TIRAMISU',
        caption: 'MATCHA · CLASSIC · CHOCO',
        image: '/hero/hero_choco_tiramisu.webp',
        href: '/menu/bread'
    },
    {
        label: 'BREAD',
        caption: 'TIRAMISU · COOKIE · CANELE',
        image: '/hero/hero_pain_choco.webp',
        href: '/menu/bread'
    },
    {
        label: 'DUBAI',
        caption: 'COOKIE · CHOCOLATE · BUTTER TTEOK',
        image: '/hero/hero_dubaibutter.webp',
        href: '/menu/dubai'
    }
];

function DessertSection() {
    return (
        <section className="dessert-showcase" aria-labelledby="dessert-title">
            <h2 id="dessert-title" className="billboard-word dessert-display-word">DESSERT</h2>

            <div className="dessert-products" aria-label="베리굿초콜릿 디저트 메뉴">
                {dessertFeatures.map((product) => (
                    <article className="dessert-product" key={product.label}>
                        <Link
                            className="showcase-image-link dessert-image-link"
                            to={product.href}
                            aria-label={`${product.label} 메뉴 보기`}
                        >
                            <img src={product.image} alt={product.label} loading="lazy" />
                            <span className="showcase-tag dessert-product-tag">{product.label}</span>
                        </Link>
                        <p>{product.caption}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default DessertSection;
