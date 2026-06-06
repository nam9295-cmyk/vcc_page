import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import CacaoSlider from '../components/sections/CacaoSlider';
import './ChocolateMenuPage.css';

const INSTAGRAM_URL = 'https://www.instagram.com/verygood_chocolate/';

const chocolateItems = [
    {
        name: '다크 57.9%',
        cacao: '57.9%',
        price: '6,500원',
        note: '진한 카카오와 부드러운 단맛의 균형'
    },
    {
        name: '다크 70.5%',
        cacao: '70.5%',
        price: '7,000원',
        note: '묵직한 풍미를 선명하게 느끼는 선택'
    },
    {
        name: '다크 100%',
        cacao: '100%',
        price: '7,500원',
        note: '카카오 본연의 깊이를 가장 진하게'
    },
    {
        name: '마일드 밀크',
        cacao: 'MILK',
        price: '7,000원',
        note: '처음 마시는 분에게도 편안한 밀크 초콜릿'
    }
];

const pairingScenes = [
    {
        label: 'FEED 01',
        title: 'CHOCOLATE WITH DESSERT',
        image: '/chocolate/choco_insta1.webp',
        href: 'https://www.instagram.com/p/DRd99eogc5a/',
        alt: '초콜릿 음료와 디저트 인스타그램 피드'
    },
    {
        label: 'FEED 02',
        title: 'CHOCOLATE MOMENT',
        image: '/chocolate/choco_insta2.webp',
        href: 'https://www.instagram.com/p/DTP9uOsAc7N/',
        alt: '초콜릿 음료 인스타그램 피드'
    }
];

function FallbackImage({ src, fallback, alt, className }) {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={(event) => {
                if (event.currentTarget.src.includes(fallback)) return;
                event.currentTarget.src = fallback;
            }}
        />
    );
}

function ChocolateMenuPage({ group }) {
    return (
        <main className="chocolate-intro-page">
            <Helmet>
                <title>{group.label} | 베리굿초콜릿 메뉴</title>
                <meta name="description" content={group.desc} />
            </Helmet>

            <section className="chocolate-hero" aria-labelledby="chocolate-title">
                <Link className="chocolate-back-link" to="/menu">전체 메뉴</Link>
                <h1 id="chocolate-title" className="billboard-word chocolate-hero-word">CHOCOLATE</h1>
                <div className="chocolate-featured-seal" aria-hidden="true">
                    <span>CACAO</span>
                    <b>CHOICE</b>
                </div>

                <div className="chocolate-hero-image-wrap">
                    <FallbackImage
                        src="/hero/hero_chocodrinks.webp"
                        fallback="/hero/hero_choco.webp"
                        alt="베리굿초콜릿 초콜릿 음료 4잔"
                        className="chocolate-hero-image"
                    />
                </div>

                <div className="chocolate-intro-copy">
                    <p className="category-tag">hot chocolate</p>
                    <h2>Choose your cacao</h2>
                    <p>
                        벨기에산 커버춰 초콜릿으로 만든 시그니처 초콜릿 음료입니다.
                        부드러운 밀크부터 진한 100%까지 원하는 카카오 농도를 고를 수 있습니다.
                    </p>
                </div>
            </section>

            <section className="chocolate-info-section" aria-labelledby="chocolate-info-title">
                <h2 id="chocolate-info-title">4 cacao moods</h2>
                <div className="chocolate-info-table" role="table" aria-label="초콜릿 음료 가격과 제품 정보">
                    <div className="chocolate-info-row chocolate-info-head" role="row">
                        <span role="columnheader">메뉴</span>
                        <span role="columnheader">농도</span>
                        <span role="columnheader">가격</span>
                    </div>
                    {chocolateItems.map((item) => (
                        <div className="chocolate-info-row" role="row" key={item.name}>
                            <span role="cell">
                                <strong>{item.name}</strong>
                                <em>{item.note}</em>
                            </span>
                            <span role="cell">{item.cacao}</span>
                            <span role="cell">{item.price}</span>
                        </div>
                    ))}
                </div>
            </section>

            <CacaoSlider />

            <section className="chocolate-pairing-section" aria-labelledby="chocolate-pairing-title">
                <h2 id="chocolate-pairing-title" className="billboard-word chocolate-pairing-word">
                    RECIPES FROM OUR FEED
                </h2>
                <p>
                    초콜릿 음료가 디저트와 만나는 장면은 인스타그램에서 더 자주 소개합니다.
                </p>
                <div className="chocolate-pairing-grid">
                    {pairingScenes.map((scene) => (
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

export default ChocolateMenuPage;
