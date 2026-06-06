import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './ChocolateMenuPage.css';

const nonCoffeeItems = [
    { name: '카카오 밀크티', price: '6,500원', note: '카카오 향을 더한 부드러운 밀크티' },
    { name: '말차 라떼', price: '6,000원', note: '진한 말차와 우유의 균형' },
    { name: '딸기 라떼', price: '6,500원', note: '딸기 과육감이 살아있는 논커피 라떼' }
];

function NonCoffeeMenuPage({ group }) {
    return (
        <main className="chocolate-intro-page noncoffee-intro-page">
            <Helmet>
                <title>{group.label} | 베리굿초콜릿 메뉴</title>
                <meta name="description" content={group.desc} />
            </Helmet>

            <section className="chocolate-hero noncoffee-hero" aria-labelledby="noncoffee-title">
                <Link className="chocolate-back-link" to="/menu">전체 메뉴</Link>
                <h1 id="noncoffee-title" className="billboard-word chocolate-hero-word noncoffee-hero-word">
                    NONCOFFEE
                </h1>
                <div className="chocolate-featured-seal noncoffee-featured-seal" aria-hidden="true">
                    <span>MILK</span>
                    <b>LATTE</b>
                </div>

                <div className="chocolate-hero-image-wrap noncoffee-hero-image-wrap">
                    <img
                        src="/hero/hero_noncoffee.webp"
                        alt="베리굿초콜릿 논커피 음료"
                        className="chocolate-hero-image noncoffee-hero-image"
                    />
                </div>

                <div className="chocolate-intro-copy">
                    <p className="category-tag">non coffee</p>
                    <h2>Soft without espresso</h2>
                    <p>
                        커피 없이도 진하게 즐기는 라떼 메뉴입니다.
                        카카오 밀크티, 말차 라떼, 딸기 라떼를 취향에 맞게 고를 수 있습니다.
                    </p>
                </div>
            </section>

            <section className="chocolate-info-section noncoffee-info-section" aria-labelledby="noncoffee-info-title">
                <h2 id="noncoffee-info-title">Non-Coffee</h2>
                <div className="chocolate-info-table ade-info-table" role="table" aria-label="논커피 가격 정보">
                    <div className="chocolate-info-row chocolate-info-head ade-info-row" role="row">
                        <span role="columnheader">메뉴</span>
                        <span role="columnheader">가격</span>
                    </div>
                    {nonCoffeeItems.map((item) => (
                        <div className="chocolate-info-row ade-info-row" role="row" key={item.name}>
                            <span role="cell">
                                <strong>{item.name}</strong>
                                <em>{item.note}</em>
                            </span>
                            <span role="cell">{item.price}</span>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default NonCoffeeMenuPage;
