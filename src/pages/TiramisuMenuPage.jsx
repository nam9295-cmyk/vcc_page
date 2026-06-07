import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './ChocolateMenuPage.css';

const INSTAGRAM_URL = 'https://www.instagram.com/verygood_chocolate/';

const tiramisuItems = [
    {
        menu: '클래식 티라미수',
        option: 'CLASSIC',
        price: '7,500원',
        note: '부드럽고 익숙한 클래식 티라미수'
    },
    {
        menu: '초코 초코 티라미수',
        option: 'CHOCO',
        price: '8,000원',
        note: '초콜릿 풍미를 진하게 더한 티라미수'
    },
    {
        menu: '말차 두바이 티라미수',
        option: 'MATCHA',
        price: '9,000원',
        note: '말차와 두바이 스타일 디저트감을 함께 담은 티라미수'
    },
    {
        menu: '딸기 티라미수',
        option: 'STRAWBERRY',
        price: '8,000원',
        note: '딸기의 산뜻함을 더한 티라미수'
    },
    {
        menu: '우베 티라미수',
        option: 'UBE',
        price: '8,500원',
        note: '우베의 고소하고 부드러운 맛을 담은 티라미수'
    }
];

const feedScenes = [
    {
        label: 'FEED 01',
        title: 'TIRAMISU MOMENT',
        image: '/tiramisu/tiramisu_insta1.webp',
        href: 'https://www.instagram.com/p/DXzNP2dASXK',
        alt: '베리굿초콜릿 티라미수 인스타그램 피드'
    },
    {
        label: 'FEED 02',
        title: 'CREAM AND CHOCOLATE',
        image: '/tiramisu/tiramisu_insta2.webp',
        href: 'https://www.instagram.com/p/DY_jJBGARfQ',
        alt: '베리굿초콜릿 티라미수 디저트 피드'
    }
];

function FeedImage({ src, alt }) {
    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={(event) => {
                if (event.currentTarget.src.includes('/hero/hero_tiramisu5ea.webp')) return;
                event.currentTarget.src = '/hero/hero_tiramisu5ea.webp';
            }}
        />
    );
}

function TiramisuMenuPage({ group }) {
    return (
        <main className="chocolate-intro-page tiramisu-intro-page">
            <Helmet>
                <title>{group.label} | 베리굿초콜릿 메뉴</title>
                <meta name="description" content={group.desc} />
            </Helmet>

            <section className="chocolate-hero tiramisu-hero" aria-labelledby="tiramisu-title">
                <Link className="chocolate-back-link" to="/menu">전체 메뉴</Link>
                <h1 id="tiramisu-title" className="billboard-word chocolate-hero-word tiramisu-hero-word">
                    TIRAMISU
                </h1>
                <div className="chocolate-featured-seal tiramisu-featured-seal" aria-hidden="true">
                    <span>CREAM</span>
                    <b>CACAO</b>
                </div>

                <div className="chocolate-hero-image-wrap tiramisu-hero-image-wrap">
                    <img
                        src="/hero/hero_tiramisu5ea.webp"
                        alt="베리굿초콜릿 티라미수"
                        className="chocolate-hero-image tiramisu-hero-image"
                    />
                </div>

                <div className="chocolate-intro-copy">
                    <p className="category-tag">tiramisu</p>
                    <h2>Soft cream dessert</h2>
                    <p>
                        크림과 초콜릿, 말차와 과일 맛을 담은 베리굿초콜릿의 티라미수 메뉴입니다.
                        클래식부터 우베까지 취향에 맞게 고를 수 있습니다.
                    </p>
                </div>
            </section>

            <section className="chocolate-info-section tiramisu-info-section" aria-labelledby="tiramisu-info-title">
                <h2 id="tiramisu-info-title">Tiramisu</h2>
                <div className="chocolate-info-table bread-info-table" role="table" aria-label="티라미수 가격 정보">
                    <div className="chocolate-info-row chocolate-info-head bread-info-row" role="row">
                        <span role="columnheader">메뉴</span>
                        <span role="columnheader">옵션</span>
                        <span role="columnheader">가격</span>
                    </div>
                    {tiramisuItems.map((item) => (
                        <div className="chocolate-info-row bread-info-row" role="row" key={item.menu}>
                            <span role="cell">
                                <strong>{item.menu}</strong>
                                <em>{item.note}</em>
                            </span>
                            <span role="cell">{item.option}</span>
                            <span role="cell">{item.price}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="chocolate-pairing-section tiramisu-feed-section" aria-labelledby="tiramisu-feed-title">
                <h2 id="tiramisu-feed-title" className="billboard-word chocolate-pairing-word">
                    RECIPES FROM OUR FEED
                </h2>
                <p>
                    티라미수와 초콜릿이 함께하는 장면은 인스타그램에서 더 자주 소개합니다.
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
                            <FeedImage src={scene.image} alt={scene.alt} />
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

export default TiramisuMenuPage;
