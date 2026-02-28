import { useRef, useState, useEffect } from 'react';
import { products, categories } from '../../data/products';
import ProductCard from '../common/ProductCard';
import './MenuSection.css';

function CategorySection({ category, isReverse }) {
    return (
        <div className="category-block">
            <div className={`category-hero ${isReverse ? 'reverse' : ''}`}>
                <div className="category-text-area">
                    <h2 className="category-title-large">{category.name}</h2>
                    <p className="category-desc-text">{category.desc}</p>
                </div>
                <div className="category-image-area">
                    <img src={category.repImage} alt={category.name} className="arch-image" />
                </div>
            </div>
        </div>
    );
}

function MenuSection() {
    const [activeCategory, setActiveCategory] = useState('signature');
    const filteredProducts = products[activeCategory] || [];
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
            <h2 className="menu-brand">menu</h2>

            {/* 1. 상단: 기존 탭 네비게이션 방식의 메뉴 슬라이드 */}
            <nav className="menu-tabs">
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

            <div className="product-container" style={{ marginBottom: '6rem' }}>
                <div className="product-list" ref={mainProductListRef}>
                    {filteredProducts.map(product => (
                        <ProductCard key={`top-${product.id}`} product={product} />
                    ))}
                </div>
                <button className="slider-nav prev" onClick={handleMainPrevClick}>❮</button>
                <button className="slider-nav next" onClick={handleMainNextClick}>❯</button>
            </div>

            {/* 2. 하단: 아치형 이미지와 함께 지그재그로 나열되는 (레그로서리 스타일) 레이아웃 */}
            {categories.map((category, index) => (
                <CategorySection
                    key={`bottom-${category.id}`}
                    category={category}
                    categoryProducts={products[category.id]}
                    isReverse={index % 2 !== 0}
                />
            ))}
        </section>
    );
}

export default MenuSection;
