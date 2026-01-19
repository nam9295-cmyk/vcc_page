import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/sections/HeroSection';
import MenuSection from '../components/sections/MenuSection';
import CacaoSlider from '../components/sections/CacaoSlider';
import LatestBlogSection from '../components/sections/LatestBlogSection';
import LocationSection from '../components/sections/LocationSection';
import ContactSection from '../components/sections/ContactSection';
import FAQSection from '../components/sections/FAQSection';

function HomePage() {
    return (
        <>
            <Helmet>
                <title>베리굿초콜릿 | 대구 수제 초콜릿 & 디저트 전문점 (VCC)</title>
                <meta
                    name="description"
                    content="대구 수성구에 위치한 프리미엄 수제 초콜릿 전문점. 프랑스산 카카오, 디톡스 티, 답례품, 원데이 클래스. 베리굿초콜릿(Very Good Chocolate) 공식 홈페이지입니다."
                />
                <link rel="canonical" href="https://kr.verygood-chocolate.com" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="베리굿초콜릿 (Very Good Chocolate)" />
                <meta property="og:description" content="달콤한 휴식이 필요할 때, 대구 최고의 수제 초콜릿을 만나보세요." />
                <meta property="og:image" content="https://github.com/nam9295-cmyk/asset/blob/main/vcc_thumb.png?raw=true" />
                <meta property="og:url" content="https://kr.verygood-chocolate.com" />
                <meta property="og:site_name" content="베리굿초콜릿" />
            </Helmet>

            <HeroSection />
            <MenuSection />
            <CacaoSlider />
            <LatestBlogSection />

            <div className="info-section-wrapper">
                <LocationSection />
                <ContactSection />
            </div>

            <FAQSection />
        </>
    );
}

export default HomePage;
