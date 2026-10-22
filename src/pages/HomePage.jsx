import MochiHeroSection from '../components/sections/MochiHeroSection';
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
