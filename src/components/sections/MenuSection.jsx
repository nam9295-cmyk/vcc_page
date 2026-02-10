import { useState, useRef, useEffect } from 'react';
import { products, categories } from '../../data/products';
import ProductCard from '../common/ProductCard';
import './MenuSection.css';

function MenuSection() {
    const [activeCategory, setActiveCategory] = useState('signature');
    const productListRef = useRef(null);

    // Handle hash navigation to auto-select category
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            if (categories.some(cat => cat.id === hash)) {
                setActiveCategory(hash);
            }
        };

        // Check initial hash
        handleHashChange();

        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const handlePrevClick = () => {
        if (productListRef.current) {
            productListRef.current.scrollBy({ left: -340, behavior: 'smooth' });
        }
    };

    const handleNextClick = () => {
        if (productListRef.current) {
            productListRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
    };

    const filteredProducts = products[activeCategory] || [];

    return (
        <section className="menu-section" id="menu">
            <h2 className="menu-brand">menu</h2>

            {/* 탭 네비게이션 */}
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

            {/* 상품 슬라이더/리스트 */}
            <div className="product-container">
                <div className="product-list" ref={productListRef}>
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* 데스크탑 슬라이더 네비게이션 */}
                <button className="slider-nav prev" onClick={handlePrevClick}>❮</button>
                <button className="slider-nav next" onClick={handleNextClick}>❯</button>
            </div>
        </section>
    );
}

export default MenuSection;
