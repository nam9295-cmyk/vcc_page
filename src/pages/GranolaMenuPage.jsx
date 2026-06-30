import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './GranolaMenuPage.css';

const HERO_IMAGE = '/hero/hero_granola.webp';
const OG_IMAGE = 'https://kr.verygood-chocolate.com/hero/hero_granola.webp';
const INSTAGRAM_URL = 'https://www.instagram.com/verygood_chocolate/';
const GRANOLA_CTA_MODE = 'prelaunch';

const ingredients = [
    { name: '오트밀', description: '바삭하고 고소한 베이스.' },
    { name: '카카오닙', description: '쌉싸름한 카카오의 식감.' },
    { name: '아몬드', description: '고소하게 씹히는 견과류.' },
    { name: '피스타치오', description: '은은한 고소함과 색감.' },
    { name: '피칸', description: '부드럽고 깊은 견과 풍미.' },
    { name: '크랜베리', description: '산뜻하게 남는 과일의 단맛.' },
    { name: '카카오파우더', description: '전체 맛을 묵직하게 잡아주는 카카오 향.' },
    { name: '다크초콜릿', description: '베리굿다운 깊은 초콜릿의 여운.' }
];

const enjoyItems = [
    '아침 커피와 함께 가볍게',
    '오후에 달콤한 것이 생각날 때',
    '디저트 대신 부담 없이',
    '차 안이나 사무실에서 간단히',
    '선물에 함께 넣는 작은 간식으로'
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

const ctaContent = {
    prelaunch: {
        title: '정식 출시 준비 중입니다.',
        body: '출시 소식은 인스타그램과 배민 공지에서 가장 먼저 안내드릴게요.',
        links: [
            { label: '인스타그램 문의하기', href: INSTAGRAM_URL, external: true },
            { label: '베리굿 메뉴 보러가기', href: '/menu' }
        ]
    },
    live: {
        title: '베리굿 카카오 그래놀라바를 만나보세요.',
        body: '온라인과 배달 채널에서도 준비되는 대로 안내드릴게요.',
        links: [
            { label: '배민에서 주문하기', href: '', external: true },
            { label: '쿠팡에서 구매하기', href: '', external: true },
            { label: '인스타그램 DM 문의하기', href: INSTAGRAM_URL, external: true }
        ]
    }
};

function CopyBlock({ children }) {
    return <div className="granola-copy-block">{children}</div>;
}

function GranolaMenuPage() {
    const currentCta = ctaContent[GRANOLA_CTA_MODE];
    const visibleCtas = currentCta.links.filter((item) => item.href);

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
                    <span>NEW</span>
                    <b>TASTE</b>
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
                        정식 출시 전, 주문 고객님께 먼저 선보이는
                        <br />
                        베리굿 카카오 그래놀라바입니다.
                    </p>
                </div>
            </section>

            <section className="granola-section" aria-labelledby="granola-qr-title">
                <h2 id="granola-qr-title">맛보기로 먼저 만나보셨나요?</h2>
                <CopyBlock>
                    <p>베리굿에서 새롭게 준비 중인 카카오 그래놀라바입니다.</p>
                    <p>
                        오트밀과 견과류를 바탕으로, 카카오닙과 다크초콜릿의 쌉싸름함,
                        크랜베리의 산뜻한 단맛을 더했습니다.
                    </p>
                    <p>정식 출시 전, 주문 고객님께 작은 맛보기로 먼저 소개드리고 있어요.</p>
                </CopyBlock>
            </section>

            <section className="granola-section granola-story-section" aria-labelledby="granola-story-title">
                <h2 id="granola-story-title">초콜릿 전문점이 만든 그래놀라바</h2>
                <CopyBlock>
                    <p>
                        가볍게 먹을 수 있지만,
                        <br />
                        맛은 가볍지 않았으면 했습니다.
                    </p>
                    <p>
                        베리굿은 초콜릿을 만들 때처럼
                        <br />
                        그래놀라바에도 카카오의 깊은 맛을 더했습니다.
                    </p>
                    <p>
                        오트밀과 견과류의 고소함, 카카오닙과 다크초콜릿의 쌉싸름함,
                        크랜베리의 산뜻함이 한 조각 안에서 이어집니다.
                    </p>
                    <p>
                        초콜릿이 생각나는 순간에도, 조금 더 가볍게 즐길 수 있는
                        베리굿의 새로운 간식입니다.
                    </p>
                </CopyBlock>
            </section>

            <section className="granola-section granola-wide-section" aria-labelledby="granola-ingredients-title">
                <h2 id="granola-ingredients-title">한 조각 안에 담은 재료</h2>
                <div className="granola-ingredient-grid">
                    {ingredients.map((item) => (
                        <article className="granola-ingredient-card" key={item.name}>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="granola-section" aria-labelledby="granola-taste-title">
                <h2 id="granola-taste-title">고소함, 쌉싸름함, 산뜻함</h2>
                <CopyBlock>
                    <p>
                        한입 베어 물면
                        <br />
                        오트밀과 견과류의 고소함이 먼저 느껴지고,
                    </p>
                    <p>
                        카카오닙과 다크초콜릿의 쌉싸름함이
                        <br />
                        맛의 중심을 잡아줍니다.
                    </p>
                    <p>
                        마지막에는 크랜베리의 산뜻한 단맛이 남아
                        <br />
                        무겁지 않게 마무리됩니다.
                    </p>
                    <p>
                        달기만 한 간식보다,
                        <br />
                        조금 더 깊은 맛을 찾는 분께 추천합니다.
                    </p>
                </CopyBlock>
            </section>

            <section className="granola-section granola-enjoy-section" aria-labelledby="granola-enjoy-title">
                <h2 id="granola-enjoy-title">이럴 때 좋아요</h2>
                <ul className="granola-enjoy-list">
                    {enjoyItems.map((item) => (
                        <li key={item}>{item}</li>
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

            <section className="granola-section granola-prelaunch-section" aria-labelledby="granola-prelaunch-title">
                <h2 id="granola-prelaunch-title">프리런칭 맛보기 진행 중</h2>
                <CopyBlock>
                    <p>
                        베리굿 카카오 그래놀라바는
                        <br />
                        정식 출시 전, 주문 고객님께 맛보기로 먼저 소개드리고 있습니다.
                    </p>
                    <p>
                        매일 준비되는 수량이 한정되어 있어
                        <br />
                        조기 소진될 수 있습니다.
                    </p>
                    <p>
                        맛있게 드셨다면
                        <br />
                        한 줄 리뷰로 베리굿을 응원해주세요.
                    </p>
                </CopyBlock>
            </section>

            <section className="granola-section granola-cta-section" aria-labelledby="granola-cta-title">
                <h2 id="granola-cta-title">{currentCta.title}</h2>
                <p>{currentCta.body}</p>
                <div className="granola-cta-actions">
                    {visibleCtas.map((item) => (
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
