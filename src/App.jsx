import { useState } from 'react';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Sections
import HeroSection from './components/sections/HeroSection';
import CategoriesSection from './components/sections/CategoriesSection';
import ProductsSection from './components/sections/ProductsSection';
import PromoBanners from './components/sections/PromoBanners';
import PartnersSection from './components/sections/PartnersSection';

// UI
import LoginModal from './components/ui/LoginModal';

// Data
import { shoeData } from './data/products';

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#000000] text-[#fafafa] font-sans selection:bg-[#95c0a4] selection:text-black">
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <Navbar onLoginClick={() => setIsLoginOpen(true)} />

      <main className="pt-24 pb-24 max-w-[1600px] mx-auto px-4 md:px-10">
        <HeroSection />
        <CategoriesSection />

        <ProductsSection
          title="Đề xuất cho bạn"
          subtitle="Dựa trên phong cách và sở thích cá nhân của bạn"
          products={shoeData}
        />

        <PromoBanners />

        <ProductsSection
          title="Hàng mới cập bến"
          subtitle="Cập nhật những xu hướng mới nhất từ thị trường toàn cầu"
          products={[...shoeData].reverse()}
          forceNew={true}
          keyPrefix="new-"
        />

        <PartnersSection />
      </main>

      <Footer />
    </div>
  );
}