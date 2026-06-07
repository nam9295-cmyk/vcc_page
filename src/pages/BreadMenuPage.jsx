import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './ChocolateMenuPage.css';

const INSTAGRAM_URL = 'https://www.instagram.com/verygood_chocolate/';

const dessertItems = [
    {
        menu: 'Pain au Chocolat',
        option: '기본',
        price: '4,500원',
        note: '버터 풍미와 초콜릿을 담은 클래식 페이스트리'
    },
    {
        menu: 'Pain au Chocolat',
        option: '초코',
        price: '5,000원',
        note: '초콜릿감을 더 진하게 올린 페이스트리'
    },
    {
        menu: 'Levain Cookie',
        option: '기본',
        price: '4,000원',
        note: '겉은 바삭하고 속은 묵직한 르뱅 쿠키'
    },
    {
        menu: 'Levain Cookie',
        option: '초코',
        price: '4,500원',
        note: '초콜릿 풍미를 더한 르뱅 쿠키'
    },
    {
        menu: 'Gâteau au Chocolat',
        option: '조각',
        price: '4,000원',
        note: '진한 초콜릿 풍미의 가토 오 쇼콜라'
    }
];

const feedScenes = [
    {
        label: 'FEED 01',
        title: 'DESSERT MOMENT',
        image: '/dessert/dessert_insta1.webp',
        href: 'https://www.instagram.com/p/DUxp9nrASno/',
        alt: '베리굿초콜릿 디저트 인스타그램 피드'
    },
    {
        label: 'FEED 02',
        title: 'BAKED WITH CHOCOLATE',
        image: '/dessert/dessert_insta2.webp',
        href: 'https://www.instagram.com/p/DXEg2t4ATbI/',
        alt: '베리굿초콜릿 초콜릿 디저트 인스타그램 피드'
    }
];

function FeedImage({ src, alt }) {
    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={(event) => {
                if (event.currentTarget.src.includes('/hero/hero_dessert.webp')) return;
                event.currentTarget.src = '/hero/hero_dessert.webp';
            }}
        />
    );
}

function BreadMenuPage({ group }) {
    return (
        <main className="chocolate-intro-page bread-intro-page">
            <Helmet>
                <title>{group.label} | 베리굿초콜릿 메뉴</title>
                <meta name="description" content={group.desc} />
            </Helmet>

            <section className="chocolate-hero bread-hero" aria-labelledby="bread-title">
                <Link className="chocolate-back-link" to="/menu">전체 메뉴</Link>
                <h1 id="bread-title" className="billboard-word chocolate-hero-word bread-hero-word">
                    DESSERT
                </h1>
                <div className="chocolate-featured-seal bread-featured-seal" aria-hidden="true">
                    <span>BAKED</span>
                    <b>DAILY</b>
                </div>

                <div className="chocolate-hero-image-wrap bread-hero-image-wrap">
                    <img
                        src="/hero/hero_dessert.webp"
                        alt="베리굿초콜릿 디저트 메뉴"
                        className="chocolate-hero-image bread-hero-image"
                    />
                </div>

                <div className="chocolate-intro-copy">
                    <p className="category-tag">dessert</p>
                    <h2>Chocolate baked goods</h2>
                    <p>
                        초콜릿과 잘 어울리는 베리굿초콜릿의 디저트 메뉴입니다.
                        빵오 쇼콜라, 르뱅 쿠키, 가토 오 쇼콜라를 가볍게 즐길 수 있습니다.
                    </p>
                </div>
            </section>

            <section className="chocolate-info-section bread-info-section" aria-labelledby="bread-info-title">
                <h2 id="bread-info-title">Dessert</h2>
                <div className="chocolate-info-table bread-info-table" role="table" aria-label="디저트 가격 정보">
                    <div className="chocolate-info-row chocolate-info-head bread-info-row" role="row">
                        <span role="columnheader">메뉴</span>
                        <span role="columnheader">옵션</span>
                        <span role="columnheader">가격</span>
                    </div>
                    {dessertItems.map((item) => (
                        <div className="chocolate-info-row bread-info-row" role="row" key={`${item.menu}-${item.option}`}>
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

            <section className="chocolate-pairing-section bread-feed-section" aria-labelledby="bread-feed-title">
                <h2 id="bread-feed-title" className="billboard-word chocolate-pairing-word">
                    RECIPES FROM OUR FEED
                </h2>
                <p>
                    디저트가 초콜릿과 만나는 장면은 인스타그램에서 더 자주 소개합니다.
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

export default BreadMenuPage;
