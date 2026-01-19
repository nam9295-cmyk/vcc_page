import './LocationSection.css';

function LocationSection() {
    return (
        <section className="location-section">
            <h2 className="location-title">LOCATION</h2>
            <div className="location-content">
                <p className="location-text">
                    대구 수성구 상록로11길 13, 1층<br />
                    지도를 클릭하면 네이버지도가 열려요 :)
                </p>
                <a
                    href="https://map.naver.com/p/entry/place/1069379954"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="location-map-link"
                >
                    <img src="/vcc_map.png" alt="오시는 길 약도" className="location-map" />
                </a>
            </div>
        </section>
    );
}

export default LocationSection;
