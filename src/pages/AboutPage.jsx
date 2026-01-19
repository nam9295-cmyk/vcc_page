import { Helmet } from 'react-helmet-async';
import './AboutPage.css';

function AboutPage() {
    return (
        <>
            <Helmet>
                <title>회사소개 | 베리굿초콜릿</title>
                <meta name="description" content="베리굿초콜릿(VCC) 회사소개. 대구 수성구에서 벨기에산 프리미엄 커버춰 초콜릿으로 만드는 수제 초콜릿 전문점입니다." />
            </Helmet>

            <main className="about-page">
                <section className="about-hero">
                    <h1>ABOUT US</h1>
                    <p>베리굿초콜릿을 소개합니다</p>
                </section>

                <section className="about-content">
                    <div className="about-text">
                        <h2>Very Good Chocolate</h2>
                        <p>
                            베리굿초콜릿은 기분이 베리굿해지는 맛있는 한 잔을 드리기 위해 만들어졌습니다.
                        </p>
                        <p>
                            벨기에산 프리미엄 커버춰 초콜릿을 사용하여 순수한 카카오의 풍미를 전달하며,
                            33% 밀크부터 100% 다크까지 개인의 취향에 맞게 카카오 농도를 조절할 수 있습니다.
                        </p>
                        <p>
                            대구 수성구에 위치한 저희 매장에서 달콤한 휴식을 경험해보세요.
                        </p>
                    </div>

                    <div className="about-values">
                        <div className="value-item">
                            <h3>Premium Ingredients</h3>
                            <p>벨기에산 프리미엄 커버춰 초콜릿만 사용합니다.</p>
                        </div>
                        <div className="value-item">
                            <h3>Customization</h3>
                            <p>33%~100%까지 카카오 농도를 자유롭게 선택하세요.</p>
                        </div>
                        <div className="value-item">
                            <h3>Handcrafted</h3>
                            <p>모든 음료와 디저트는 직접 제조합니다.</p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default AboutPage;
