import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './ChocolateMenuPage.css';

const INSTAGRAM_URL = 'https://www.instagram.com/verygood_chocolate/';

const dubaiItems = [
    {
        menu: '두바이 쫀득 쿠키',
        option: 'COOKIE',
        price: '7,500원',
        note: '쫀득한 식감으로 즐기는 두바이 스타일 쿠키'
    },
    {
        menu: '두바이 초콜릿',
        option: 'CHOCOLATE',
        price: '8,500원',
        note: '진한 초콜릿과 두바이 디저트 무드'
    },
    {
        menu: '두바이 버터떡',
        option: 'BUTTER TTEOK',
        price: '9,500원',
        note: '버터떡에 두바이 스타일 풍미를 더한 메뉴'
    },
    {
        menu: '초코 버터떡',
        option: 'CHOCO TTEOK',
        price: '4,500원',
        note: '초콜릿과 버터떡을 가볍게 즐기는 메뉴'
    }
];

const feedScenes = [
    {
        label: 'FEED 01',
        title: 'DUBAI DESSERT',
        image: '/dubai/dubai_insta1.webp',
        href: 'https://www.instagram.com/p/DYYZ7CQgaRe/',
        alt: '베리굿초콜릿 두바이 디저트 인스타그램 피드'
    },
    {
        label: 'FEED 02',
        title: 'CHOCOLATE AND TTEOK',
        image: '/dubai/dubai_insta2.webp',
        href: 'https://www.instagram.com/p/DXJ63WHgVM8/',
        alt: '베리굿초콜릿 두바이 초콜릿 피드'
    }
];

function FeedImage({ src, alt }) {
    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={(event) => {
                if (event.currentTarget.src.includes('/hero/hero_dubai3ea.webp')) return;
                event.currentTarget.src = '/hero/hero_dubai3ea.webp';
            }}
        />
    );
}

function DubaiMenuPage({ group }) {
    return (
        <main className="chocolate-intro-page dubai-intro-page">
            <Helmet>
                <title>{group.label} | 베리굿초콜릿 메뉴</title>
                <meta name="description" content={group.desc} />
            </Helmet>

            <section className="chocolate-hero dubai-hero" aria-labelledby="dubai-title">
                <Link className="chocolate-back-link" to="/menu">전체 메뉴</Link>
                <h1 id="dubai-title" className="billboard-word chocolate-hero-word dubai-hero-word">
                    DUBAI
                </h1>
                <div className="chocolate-featured-seal dubai-featured-seal" aria-hidden="true">
                    <span>RICH</span>
                    <b>SWEET</b>
                </div>

                <div className="chocolate-hero-image-wrap dubai-hero-image-wrap">
                    <img
                        src="/hero/hero_dubai3ea.webp"
                        alt="베리굿초콜릿 두바이 디저트"
                        className="chocolate-hero-image dubai-hero-image"
                    />
                </div>

                <div className="chocolate-intro-copy">
                    <p className="category-tag">dubai dessert</p>
                    <h2>Rich chocolate dessert</h2>
                    <p>
                        쫀득한 쿠키와 초콜릿, 버터떡으로 즐기는 베리굿초콜릿의 두바이 디저트 메뉴입니다.
                        진한 맛과 식감이 살아있는 메뉴를 고를 수 있습니다.
                    </p>
                </div>
            </section>

            <section className="chocolate-info-section dubai-info-section" aria-labelledby="dubai-info-title">
                <h2 id="dubai-info-title">Dubai</h2>
                <div className="chocolate-info-table bread-info-table" role="table" aria-label="두바이 디저트 가격 정보">
                    <div className="chocolate-info-row chocolate-info-head bread-info-row" role="row">
                        <span role="columnheader">메뉴</span>
                        <span role="columnheader">옵션</span>
                        <span role="columnheader">가격</span>
                    </div>
                    {dubaiItems.map((item) => (
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

            <section className="chocolate-pairing-section dubai-feed-section" aria-labelledby="dubai-feed-title">
                <h2 id="dubai-feed-title" className="billboard-word chocolate-pairing-word">
                    RECIPES FROM OUR FEED
                </h2>
                <p>
                    두바이 디저트가 초콜릿과 만나는 장면은 인스타그램에서 더 자주 소개합니다.
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

export default DubaiMenuPage;
