import { useRef, useState, useEffect } from 'react';
import { products, categories } from '../../data/products';
import ProductCard from '../common/ProductCard';
import './MenuSection.css';

const categoryWords = {
    'hot-chocolate': 'CHOCOLATE',
    'coffee-classics': 'COFFEE',
    'chocolate-box': 'CACAO',
    'chocolate-bottle': 'CACAO',
    'cacao-detox-tea': 'TEA',
    'non-coffee': 'CACAO',
    ade: 'TEA',
    tiramisu: 'DESSERT',
    'levain-cookie': 'DESSERT',
    'cacao-granola': 'CACAO',
    'pain-au-chocolat': 'DESSERT',
    canele: 'DESSERT',
    'chocolat-macaron': 'DESSERT',
    dubai: 'DESSERT',
    cake: 'DESSERT'
};

function MenuSection() {
    const [activeCategory, setActiveCategory] = useState(categories[0]?.id || '');
    const filteredProducts = products[activeCategory] || [];
    const activeCategoryData = categories.find(cat => cat.id === activeCategory) || categories[0];
    const billboardWord = categoryWords[activeCategory] || 'CHOCOLATE';
    const isDessertTone = billboardWord === 'DESSERT' || billboardWord === 'CACAO';
    const mainProductListRef = useRef(null);

    // Handle hash navigation to auto-select category in the top slider
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            if (categories.some(cat => cat.id === hash)) {
                setActiveCategory(hash);
            }
        };

        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const handleMainPrevClick = () => {
        if (mainProductListRef.current) {
            mainProductListRef.current.scrollBy({ left: -340, behavior: 'smooth' });
        }
    };

    const handleMainNextClick = () => {
        if (mainProductListRef.current) {
            mainProductListRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
    };

    return (
        <section className="menu-section" id="menu">
            <div className="menu-heading">
                <h2 className={`billboard-word ${isDessertTone ? 'is-yellow' : ''}`}>{billboardWord}</h2>
                <p className="category-tag">{activeCategoryData?.name}</p>
                <p>{activeCategoryData?.desc}</p>
            </div>

            <nav className="menu-tabs" aria-label="메뉴 카테고리">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat.id)}
                        id={cat.id}
                    >
                        {cat.name}
                    </button>
                ))}
            </nav>

            <div className="product-container">
                <div className="product-list" ref={mainProductListRef}>
                    {filteredProducts.map(product => (
                        <ProductCard key={`top-${product.id}`} product={product} />
                    ))}
                </div>
                <button className="slider-nav prev" onClick={handleMainPrevClick} aria-label="이전 메뉴">‹</button>
                <button className="slider-nav next" onClick={handleMainNextClick} aria-label="다음 메뉴">›</button>
            </div>
        </section>
    );
}

export default MenuSection;
