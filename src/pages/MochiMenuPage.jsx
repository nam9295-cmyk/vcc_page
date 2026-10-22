import { Link } from 'react-router-dom';
import MochiHeroSection from '../components/sections/MochiHeroSection';
import { mochiFlavors } from '../data/mochi';
import { store } from '../data/store';
import FAQSection from '../components/sections/FAQSection';
import './MochiMenuPage.css';

function MochiMenuPage() {
    return (
        <main className="mochi-page" id="main-content">

            <MochiHeroSection detail />

            <section className="mochi-flavors" id="mochi-flavors" aria-labelledby="mochi-flavors-title">
                <div className="mochi-flavors-heading">
                    <h2 id="mochi-flavors-title">모찌 5가지 맛</h2>
                    <p>진한 초콜릿부터 상큼한 과일까지,<br />좋아하는 맛으로 골라보세요.</p>
                </div>
                <ol className="mochi-flavor-list">
                    {mochiFlavors.map((flavor) => (
                        <li key={flavor.id} id={flavor.id}>
                            <h3>{flavor.name}</h3>
                            <p>{flavor.description}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="mochi-fruit" aria-labelledby="mochi-fruit-title">
                <h2 id="mochi-fruit-title">초콜릿 속에 담은 과일</h2>
                <div className="mochi-fruit-photos">
                    {mochiFlavors.filter((flavor) => flavor.id === 'shine-muscat' || flavor.id === 'jeju-mandarin').map((flavor) => (
                        <figure key={flavor.id}>
                            <img src={flavor.image} alt={flavor.imageAlt} width="1080" height="1012" loading="lazy" />
                            <figcaption>{flavor.name}</figcaption>
                        </figure>
                    ))}
                </div>
            </section>

            <section className="mochi-visit" aria-labelledby="mochi-visit-title" data-analytics-location="mochi_visit">
                <h2 id="mochi-visit-title">대구 베리굿초콜릿에서 만나요</h2>
                <p>{store.address}</p>
                <p>{store.hours} · <a href="tel:07078400717">{store.phone}</a></p>
                <p>당일 판매 메뉴와 재고는 매장에 문의해주세요.</p>
                <div className="mochi-visit-actions">
                    <a className="outline-button" href={store.naverMap} target="_blank" rel="noopener noreferrer">매장 위치 보기</a>
                    <a className="outline-button" href="tel:07078400717">전화 문의</a>
                    <Link className="mochi-all-menu" to="/menu">전체 메뉴 보기 →</Link>
                </div>
            </section>
            <FAQSection />
        </main>
    );
}

export default MochiMenuPage;
