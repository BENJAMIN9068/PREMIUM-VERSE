import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import HeroSection from '../../components/home/HeroSection';
import CategorySection from '../../components/home/CategorySection';
import ProductGrid from '../../components/home/ProductGrid';
import TrustElements from '../../components/home/TrustElements';
import Testimonials from '../../components/home/Testimonials';
import SpaceBackground from '../../components/ui/SpaceBackground';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Unified Professional Background */}
            <SpaceBackground />

            {/* Content with higher Z-index */}
            <div className="relative z-10">
                <Navbar />
                <main>
                    <HeroSection />
                    <CategorySection />
                    <ProductGrid />
                    <TrustElements />
                    <Testimonials />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default HomePage;
