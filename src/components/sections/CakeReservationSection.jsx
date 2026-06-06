import './CakeReservationSection.css';

function CakeReservationSection() {
    return (
        <section className="cake-reservation" aria-labelledby="cake-title">
            <h2 id="cake-title" className="billboard-word cake-display-word">CAKE</h2>

            <div className="cake-content">
                <a
                    className="showcase-image-link cake-image-link"
                    href="https://cake.verygood-chocolate.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="케이크 예약 페이지 열기"
                >
                    <img src="/hero/hero_cake.webp" alt="예약주문 케이크" loading="lazy" />
                    <span className="showcase-tag cake-product-tag">CAKE</span>
                </a>
            </div>
        </section>
    );
}

export default CakeReservationSection;
