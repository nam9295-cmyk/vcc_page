import { Link } from 'react-router-dom';
import { mochiFlavors } from '../../data/mochi';
import './MochiHeroSection.css';

function MochiHeroSection({ detail = false }) {
    const original = mochiFlavors[0];

    return (
        <section className="mochi-hero" aria-labelledby="mochi-title">
            <div className="mochi-hero-visual">
                <p className="billboard-word mochi-display-word" aria-hidden="true">MOCHI</p>
                <img
                    className="mochi-hero-image"
                    src={original.image}
                    alt={original.imageAlt}
                    width="1080"
                    height="1012"
                    fetchPriority="high"
                />
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
