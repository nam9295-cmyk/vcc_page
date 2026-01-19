import './CacaoSlider.css';

function CacaoSlider() {
    return (
        <div className="custom-teaser-container">
            <div className="teaser-title">당신의 카카오 농도는 몇 %인가요?</div>
            <div className="teaser-desc">
                손가락으로 슬라이더를 움직여보세요.<br />
                부드러운 밀크부터 진한 100%까지 직접 고를 수 있습니다.
            </div>

            <div className="slider-wrapper">
                <input type="range" min="33" max="100" defaultValue="70" className="chocolate-range" />

                <div className="slider-labels">
                    <span>100%</span>
                    <span style={{ position: 'relative', right: '5px' }}>70.5%</span>
                    <span style={{ position: 'relative', right: '10px' }}>57.9%</span>
                    <span>MILK</span>
                </div>
            </div>

            <a
                href="https://order.verygood-chocolate.com"
                target="_blank"
                rel="noopener noreferrer"
                className="go-custom-btn"
            >
                내 음료 만들러 가기 →
            </a>
        </div>
    );
}

export default CacaoSlider;
