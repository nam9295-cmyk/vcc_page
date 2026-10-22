import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import MochiHeroSection from '../components/sections/MochiHeroSection';
import { mochiDescription, mochiFlavors, mochiImage } from '../data/mochi';
import './MochiMenuPage.css';

const canonicalUrl = 'https://kr.verygood-chocolate.com/menu/mochi';
const menuSchema = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${canonicalUrl}#menu`,
    name: '베리굿초콜릿 리얼 가나슈 초코 모찌',
    description: mochiDescription,
    url: canonicalUrl,
    inLanguage: 'ko-KR',
    image: mochiImage,
    hasMenuSection: {
        '@type': 'MenuSection',
        name: '초코 모찌 5종',
        hasMenuItem: mochiFlavors.map((flavor) => ({
            '@type': 'MenuItem',
            name: flavor.name,
            description: flavor.description,
            ...(flavor.image ? { image: `https://kr.verygood-chocolate.com${flavor.image}` } : {})
        }))
    }
};

function MochiMenuPage() {
    return (
        <main className="mochi-page" id="main-content">
            <Helmet>
                <title>대구 초코 모찌 5종 | 베리굿초콜릿</title>
                <meta name="description" content={mochiDescription} />
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="리얼 가나슈 초코 모찌 | 베리굿초콜릿" />
                <meta property="og:description" content={mochiDescription} />
                <meta property="og:image" content={mochiImage} />
                <meta property="og:image:alt" content={mochiFlavors[0].imageAlt} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:locale" content="ko_KR" />
                <script type="application/ld+json">{JSON.stringify(menuSchema)}</script>
            </Helmet>

            <MochiHeroSection detail />

            <section className="mochi-flavors" id="mochi-flavors" aria-labelledby="mochi-flavors-title">
                <div className="mochi-flavors-heading">
                    <h2 id="mochi-flavors-title">모찌 5가지 맛</h2>
                    <p>진한 초콜릿부터 상큼한 과일까지,<br />좋아하는 맛으로 골라보세요.</p>
                </div>
                <ol className="mochi-flavor-list">
                    {mochiFlavors.map((flavor) => (
                        <li key={flavor.id}>
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

            <section className="mochi-visit" aria-labelledby="mochi-visit-title">
                <h2 id="mochi-visit-title">대구 베리굿초콜릿에서 만나요</h2>
                <p>대구광역시 수성구 상록로11길 13, 1층</p>
                <p>당일 판매 메뉴와 재고는 매장에 문의해주세요.</p>
                <div className="mochi-visit-actions">
                    <a className="outline-button" href="https://map.naver.com/p/entry/place/1069379954" target="_blank" rel="noopener noreferrer">매장 위치 보기</a>
                    <a className="outline-button" href="tel:07078400717">전화 문의</a>
                    <Link className="mochi-all-menu" to="/menu">전체 메뉴 보기 →</Link>
                </div>
            </section>
        </main>
    );
}

export default MochiMenuPage;
