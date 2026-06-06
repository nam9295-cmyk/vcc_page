import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './ChocolateMenuPage.css';

const INSTAGRAM_URL = 'https://www.instagram.com/verygood_chocolate/';

const detoxItems = [
    { name: '브리티쉬블랙', price: '4,500원', note: '깊고 깔끔한 블랙티 베이스' },
    { name: '아시안골드', price: '4,500원', note: '부드러운 골드 티 블렌드' },
    { name: '히비스커스프룻', price: '4,500원', note: '상큼한 과일 향의 히비스커스' },
    { name: '민티쇼콜라', price: '4,500원', note: '민트와 쇼콜라의 산뜻한 조합' }
];

const feedScenes = [
    {
        label: 'FEED 01',
        title: 'DETOX TEA MOMENT',
        image: '/detox/detox_insta1.webp',
        href: 'https://www.instagram.com/p/DS9gfVMgaj7/',
        alt: '베리굿초콜릿 디톡스 티 인스타그램 피드'
    },
    {
        label: 'FEED 02',
        title: 'CACAO BLENDED TEA',
        image: '/detox/detox_insta2.webp',
        href: 'https://www.instagram.com/p/DS_gDhOEy-Y/',
        alt: '베리굿초콜릿 카카오 블렌드 티 인스타그램 피드'
    }
];

function DetoxMenuPage({ group }) {
    return (
        <main className="chocolate-intro-page detox-intro-page">
            <Helmet>
                <title>{group.label} | 베리굿초콜릿 메뉴</title>
                <meta name="description" content={group.desc} />
            </Helmet>

            <section className="chocolate-hero detox-hero" aria-labelledby="detox-title">
                <Link className="chocolate-back-link" to="/menu">전체 메뉴</Link>
                <h1 id="detox-title" className="billboard-word chocolate-hero-word detox-hero-word">DETOX</h1>
                <div className="chocolate-featured-seal detox-featured-seal" aria-hidden="true">
                    <span>TEA</span>
                    <b>BLEND</b>
                </div>

                <div className="chocolate-hero-image-wrap detox-hero-image-wrap">
                    <img
                        src="/hero/hero_detox_cups.webp"
                        alt="베리굿초콜릿 디톡스 티 음료"
                        className="chocolate-hero-image detox-hero-image"
                    />
                </div>

                <div className="chocolate-intro-copy">
                    <p className="category-tag">cacao detox tea</p>
                    <h2>Tea for your mood</h2>
                    <p>
                        가볍게 즐기는 베리굿초콜릿의 티 블렌드입니다.
                        브리티쉬블랙부터 민티쇼콜라까지 취향에 맞는 향을 고를 수 있습니다.
                    </p>
                </div>
            </section>

            <section className="chocolate-info-section detox-info-section" aria-labelledby="detox-info-title">
                <h2 id="detox-info-title">Detox tea</h2>
                <div className="chocolate-info-table ade-info-table" role="table" aria-label="디톡스 티 가격 정보">
                    <div className="chocolate-info-row chocolate-info-head ade-info-row" role="row">
                        <span role="columnheader">메뉴</span>
                        <span role="columnheader">가격</span>
                    </div>
                    {detoxItems.map((item) => (
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

            <section className="chocolate-pairing-section" aria-labelledby="detox-feed-title">
                <h2 id="detox-feed-title" className="billboard-word chocolate-pairing-word">
                    RECIPES FROM OUR FEED
                </h2>
                <p>
                    디톡스 티와 함께하는 장면은 인스타그램에서 더 자주 소개합니다.
                </p>
                <div className="chocolate-pairing-grid">
                    {feedScenes.map((scene) => (
                        <a
                            className="chocolate-pairing-card"
                            href={scene.href}
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

export default DetoxMenuPage;
