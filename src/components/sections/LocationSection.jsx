import './LocationSection.css';
import { store } from '../../data/store';

function LocationSection() {
    return (
        <section className="location-section" data-analytics-location="home_location">
            <h2 className="location-title">LOCATION</h2>
            <div className="location-content">
                <p className="location-text">
                    {store.address}<br />
                    {store.hours}<br />
                    <a href="tel:07078400717">{store.phone}</a>
                </p>
                <a
                    href={store.naverMap}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="location-map-link"
                >
                    <img src="/vcc_map.png" alt="대구 수성구 상록로11길 13 베리굿초콜릿 오시는 길 약도" loading="lazy" className="location-map" />
                </a>
            </div>
        </section>
    );
}

export default LocationSection;
