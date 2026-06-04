import './ProductCard.css';

function ProductCard({ product }) {
    return (
        <div className="product-card">
            <div className={`product-image-slot ${product.image ? '' : 'is-empty'}`}>
                {product.image && <img src={product.image} alt={product.name} loading="lazy" />}
            </div>
            <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
            </div>
        </div>
    );
}

export default ProductCard;
