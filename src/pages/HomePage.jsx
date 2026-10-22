import { Helmet } from 'react-helmet-async';
import MochiHeroSection from '../components/sections/MochiHeroSection';
import { mochiDescription, mochiImage } from '../data/mochi';
import HeroSection from '../components/sections/HeroSection';
import DessertSection from '../components/sections/DessertSection';
import GranolaSection from '../components/sections/GranolaSection';
import CakeReservationSection from '../components/sections/CakeReservationSection';
import LatestBlogSection from '../components/sections/LatestBlogSection';
import LocationSection from '../components/sections/LocationSection';
import ContactSection from '../components/sections/ContactSection';
import FAQSection from '../components/sections/FAQSection';

function HomePage() {
    return (
        <>
            <Helmet>
                <title>베리굿초콜릿 | 대구 초코 모찌 · 수제 초콜릿 · 디저트</title>
                <meta
                    name="description"
                    content={mochiDescription}
                />
                <link rel="canonical" href="https://kr.verygood-chocolate.com/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="대구 리얼 가나슈 초코 모찌 | 베리굿초콜릿" />
                <meta property="og:description" content={mochiDescription} />
                <meta property="og:image" content={mochiImage} />
                <meta property="og:url" content="https://kr.verygood-chocolate.com/" />
                <meta property="og:site_name" content="베리굿초콜릿" />
            </Helmet>

            <main id="main-content">
                <MochiHeroSection />
                <HeroSection />
                <DessertSection />
                <GranolaSection />
                <CakeReservationSection />
                <LatestBlogSection />

                <div className="info-section-wrapper">
                    <LocationSection />
                    <ContactSection />
                </div>

                <FAQSection />
            </main>
        </>
    );
}

export default HomePage;
