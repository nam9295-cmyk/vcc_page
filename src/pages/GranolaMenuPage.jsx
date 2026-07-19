import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './GranolaMenuPage.css';

const HERO_IMAGE = '/hero/hero_granola.webp';
const OG_IMAGE = 'https://kr.verygood-chocolate.com/hero/hero_granola.webp';
const INSTAGRAM_URL = 'https://www.instagram.com/verygood_chocolate/';

const ingredients = [
    { name: '오트밀', description: '바삭하고 고소한 베이스.', image: '/granola/ingredient-oatmeal.png' },
    { name: '카카오닙', description: '쌉싸름한 카카오의 식감.', image: '/granola/ingredient-cacao-nibs.png' },
    { name: '아몬드', description: '고소하게 씹히는 견과류.', image: '/granola/ingredient-almond.png' },
    { name: '피스타치오', description: '은은한 고소함과 색감.', image: '/granola/ingredient-pistachio.png' },
    { name: '피칸', description: '부드럽고 깊은 견과 풍미.', image: '/granola/ingredient-pecan.png' },
    { name: '크랜베리', description: '산뜻하게 남는 과일의 단맛.', image: '/granola/ingredient-cranberry.png' },
    { name: '카카오파우더', description: '전체 맛을 묵직하게 잡아주는 카카오 향.', image: '/granola/ingredient-cacao.png' },
    { name: '다크초콜릿', description: '베리굿다운 깊은 초콜릿의 여운.', image: '/granola/ingredient-dark-chocolate.png' }
];

const enjoyItems = [
    {
        title: '커피와 함께',
        description: '따뜻한 커피 옆에 두는 작은 카카오 간식',
        image: '/granola/occasion-coffee.png'
    },
    {
        title: '오후 간식',
        description: '출출한 오후, 책상 위에 가볍게',
        image: '/granola/occasion-afternoon-energy.png'
    },
    {
        title: '활동 전후',
        description: '가방에 챙겨 어디서든 간편하게',
        image: '/granola/occasion-workout.png'
    },
    {
        title: '작은 선물',
        description: '초콜릿을 좋아하는 사람에게 건네는 마음',
        image: '/granola/occasion-gift.png'
    }
];

const productInfo = [
    { label: '제품명', value: '베리굿 카카오 그래놀라바' },
    { label: '내용량', value: '45g 내외' },
    {
        label: '주요 원재료',
        value: '오트밀, 카카오닙, 아몬드, 피스타치오, 피칸, 크랜베리, 카카오파우더, 다크초콜릿'
    },
    { label: '보관 방법', value: '직사광선을 피해 서늘한 곳에 보관해주세요.' },
    { label: '섭취 안내', value: '개봉 후에는 빠른 섭취를 권장합니다.' },
    { label: '제조 방식', value: '매장에서 소량씩 제조하는 수제 그래놀라바입니다.' }
];

const salesLinks = [
    { label: '인스타그램 DM 문의하기', href: INSTAGRAM_URL, external: true },
    { label: '베리굿 전체 메뉴 보기', href: '/menu' }
];

function CopyBlock({ children }) {
    return <div className="granola-copy-block">{children}</div>;
}

function GranolaMenuPage() {
    return (
        <main className="granola-page">
            <Helmet>
                <title>베리굿 카카오 그래놀라바 | Very Good Chocolate</title>
                <meta
                    name="description"
                    content="오트밀, 견과류, 카카오닙, 다크초콜릿을 한 조각에 담은 베리굿의 수제 카카오 그래놀라바."
                />
                <meta property="og:title" content="베리굿 카카오 그래놀라바 | Very Good Chocolate" />
                <meta
                    property="og:description"
                    content="오트밀, 견과류, 카카오닙, 다크초콜릿을 한 조각에 담은 베리굿의 수제 카카오 그래놀라바."
                />
                <meta property="og:image" content={OG_IMAGE} />
            </Helmet>

            <section className="granola-hero" aria-labelledby="granola-title">
                <Link className="granola-back-link" to="/menu">전체 메뉴</Link>
                <p className="billboard-word granola-hero-word" aria-hidden="true">GRANOLA</p>
                <div className="granola-featured-seal" aria-hidden="true">
                    <span>NOW</span>
                    <b>ON SALE</b>
                </div>

                <div className="granola-hero-image-wrap">
                    <img
                        src={HERO_IMAGE}
                        alt="베리굿 카카오 그래놀라바"
                        className="granola-hero-image"
                    />
                </div>

                <div className="granola-intro-copy">
                    <p className="category-tag">cacao granola bar</p>
                    <h1 id="granola-title">Cacao Granola Bar</h1>
                    <p>
                        오트밀, 견과류, 카카오닙, 다크초콜릿을
                        <br />
                        한 조각에 담은 베리굿의 새로운 간식.
                    </p>
                    <p className="granola-hero-subcopy">
                        베리굿 매장에서 정식 판매 중인
                        <br />
                        수제 카카오 그래놀라바입니다.
                    </p>
                </div>
            </section>

            <section className="granola-section granola-wide-section" aria-labelledby="granola-ingredients-title">
                <h2 id="granola-ingredients-title">한 조각 안에 담은 재료</h2>
                <div className="granola-ingredient-grid">
                    {ingredients.map((item) => (
                        <article className="granola-ingredient-card" key={item.name}>
                            <img src={item.image} alt="" loading="lazy" />
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="granola-section granola-enjoy-section" aria-labelledby="granola-enjoy-title">
                <h2 id="granola-enjoy-title">이럴 때 좋아요</h2>
                <ul className="granola-enjoy-list">
                    {enjoyItems.map((item) => (
                        <li key={item.title}>
                            <img src={item.image} alt="" loading="lazy" />
                            <div>
                                <strong>{item.title}</strong>
                                <span>{item.description}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="granola-section" aria-labelledby="granola-product-info-title">
                <h2 id="granola-product-info-title">제품 정보</h2>
                <div className="granola-info-table" role="table" aria-label="베리굿 카카오 그래놀라바 제품 정보">
                    {productInfo.map((item) => (
                        <div className="granola-info-row" role="row" key={item.label}>
                            <strong role="rowheader">{item.label}</strong>
                            <span role="cell">{item.value}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="granola-section granola-notice-section" aria-labelledby="granola-allergy-title">
                <h2 id="granola-allergy-title">알레르기 안내</h2>
                <CopyBlock>
                    <p>본 제품은 견과류를 포함하고 있습니다.</p>
                    <p>
                        사용 원재료에는 아몬드, 피스타치오, 피칸, 카카오닙,
                        다크초콜릿, 크랜베리 등이 포함됩니다.
                    </p>
                    <p>
                        우유, 대두, 밀, 견과류 등을 사용하는 제품과
                        같은 제조 공간에서 제조될 수 있습니다.
                    </p>
                    <p>
                        원재료 및 알레르기 정보는
                        정식 판매 제품의 표시사항을 함께 확인해주세요.
                    </p>
                </CopyBlock>
            </section>

            <section className="granola-section granola-cta-section" aria-labelledby="granola-cta-title">
                <h2 id="granola-cta-title">베리굿 카카오 그래놀라바, 정식 판매 중</h2>
                <p>베리굿 매장에서 만나보세요. 당일 재고는 인스타그램 DM으로 문의해주세요.</p>
                <div className="granola-cta-actions">
                    {salesLinks.map((item) => (
                        item.external ? (
                            <a
                                className="outline-button granola-cta-button"
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={item.label}
                            >
                                {item.label}
                            </a>
                        ) : (
                            <Link className="outline-button granola-cta-button" to={item.href} key={item.label}>
                                {item.label}
                            </Link>
                        )
                    ))}
                </div>
            </section>
        </main>
    );
}

export default GranolaMenuPage;
