import { Link } from 'react-router-dom';
import { mochiFlavors } from '../../data/mochi';
import './MochiHeroSection.css';

function MochiHeroSection({ detail = false }) {
    const original = mochiFlavors[0];
    const featuredFlavors = mochiFlavors.filter((flavor) =>
        ['original', 'shine-muscat', 'jeju-mandarin'].includes(flavor.id)
    );

    return (
        <section className={`mochi-hero${detail ? '' : ' mochi-hero--trio'}`} aria-labelledby="mochi-title">
            <div className="mochi-hero-visual">
                <p className="billboard-word mochi-display-word" aria-hidden="true">MOCHI</p>
                {detail ? (
                    <img
                        className="mochi-hero-image"
                        src={original.image}
                        alt={original.imageAlt}
                        width="1080"
                        height="1012"
                        fetchPriority="high"
                    />
                ) : (
                    <div className="mochi-hero-products" aria-label="베리굿초콜릿 대표 모찌">
                        {featuredFlavors.map((flavor, index) => (
                            <article className="mochi-hero-product" key={flavor.id}>
                                <Link
                                    className="showcase-image-link mochi-image-link"
                                    to="/menu/mochi"
                                    aria-label={`${flavor.name} — 모찌 메뉴 보기`}
                                >
                                    <img
                                        className="mochi-product-image"
                                        src={flavor.image}
                                        alt={flavor.imageAlt}
                                        width="1080"
                                        height="1012"
                                        fetchPriority={index === 0 ? 'high' : 'auto'}
                                    />
                                    <span className="showcase-tag mochi-product-tag">
                                        {flavor.name.replace(' 초코 모찌', '')}
                                    </span>
                                </Link>
                            </article>
                        ))}
                    </div>
                )}
            </div>
            <div className="mochi-hero-copy">
                <h1 id="mochi-title">리얼 가나슈 초코 모찌</h1>
                <p>얇고 쫀득한 찹쌀피, 속까지 진한 초콜릿.<br />대구 베리굿초콜릿의 모찌를 만나보세요.</p>
                {detail ? (
                    <a className="outline-button mochi-hero-button" href="#mochi-flavors">다섯 가지 맛 살펴보기 <span aria-hidden="true">↓</span></a>
                ) : (
                    <Link className="outline-button mochi-hero-button" to="/menu/mochi">모찌 5가지 맛 보기 <span aria-hidden="true">→</span></Link>
                )}
            </div>
        </section>
    );
}

export default MochiHeroSection;
