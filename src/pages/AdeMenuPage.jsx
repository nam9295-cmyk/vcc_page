import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './ChocolateMenuPage.css';

const INSTAGRAM_URL = 'https://www.instagram.com/verygood_chocolate/';

const adeItems = [
    { name: '디톡스티 에이드', price: '5,500원', note: '가볍고 산뜻한 티 베이스 에이드' },
    { name: '체리에이드', price: '5,000원', note: '달콤한 체리의 선명한 향' },
    { name: '레몬에이드', price: '4,500원', note: '깔끔하게 마시는 시트러스 에이드' },
    { name: '아이스티', price: '4,000원', note: '차갑게 즐기는 베이직 아이스티' }
];

const feedScenes = [
    {
        label: 'FEED 01',
        title: 'ADE MOMENT',
        image: '/hero/hero_ades.webp',
        alt: '베리굿초콜릿 에이드 인스타그램 피드'
    },
    {
        label: 'FEED 02',
        title: 'ICED ONLY',
        image: '/hero/hero_ade.webp',
        alt: '베리굿초콜릿 아이스 음료 인스타그램 피드'
    }
];

function AdeMenuPage({ group }) {
    return (
        <main className="chocolate-intro-page ade-intro-page">
            <Helmet>
                <title>{group.label} | 베리굿초콜릿 메뉴</title>
                <meta name="description" content={group.desc} />
            </Helmet>

            <section className="chocolate-hero ade-hero" aria-labelledby="ade-title">
                <Link className="chocolate-back-link" to="/menu">전체 메뉴</Link>
                <h1 id="ade-title" className="billboard-word chocolate-hero-word ade-hero-word">ADE</h1>
                <div className="chocolate-featured-seal ade-featured-seal" aria-hidden="true">
                    <span>ICED</span>
                    <b>ONLY</b>
                </div>

                <div className="chocolate-hero-image-wrap ade-hero-image-wrap">
                    <img
                        src="/hero/hero_ades.webp"
                        alt="베리굿초콜릿 에이드 음료"
                        className="chocolate-hero-image ade-hero-image"
                    />
                </div>

                <div className="chocolate-intro-copy">
                    <p className="category-tag">ade iced only</p>
                    <h2>Fresh iced ade</h2>
                    <p>
                        차갑게 즐기는 베리굿초콜릿의 에이드 메뉴입니다.
                        디톡스티 에이드부터 체리, 레몬, 아이스티까지 산뜻하게 준비합니다.
                    </p>
                </div>
            </section>

            <section className="chocolate-info-section ade-info-section" aria-labelledby="ade-info-title">
                <h2 id="ade-info-title">Ade (Iced only)</h2>
                <div className="chocolate-info-table ade-info-table" role="table" aria-label="에이드 가격 정보">
                    <div className="chocolate-info-row chocolate-info-head ade-info-row" role="row">
                        <span role="columnheader">메뉴</span>
                        <span role="columnheader">가격</span>
                    </div>
                    {adeItems.map((item) => (
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

            <section className="chocolate-pairing-section" aria-labelledby="ade-feed-title">
                <h2 id="ade-feed-title" className="billboard-word chocolate-pairing-word">
                    RECIPES FROM OUR FEED
                </h2>
                <p>
                    에이드와 디저트가 함께하는 장면은 인스타그램에서 더 자주 소개합니다.
                </p>
                <div className="chocolate-pairing-grid">
                    {feedScenes.map((scene) => (
                        <a
                            className="chocolate-pairing-card"
                            href={INSTAGRAM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={scene.label}
                            aria-label={`${scene.title} 인스타그램에서 보기`}
                        >
                            <img src={scene.image} alt={scene.alt} loading="lazy" />
                            <span>{scene.label}</span>
                            <strong>{scene.title}</strong>
                        </a>
                    ))}
                </div>
                <a
                    className="chocolate-instagram-link"
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    @verygood_chocolate
                </a>
            </section>
        </main>
    );
}

export default AdeMenuPage;
