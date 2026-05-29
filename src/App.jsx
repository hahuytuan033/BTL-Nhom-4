import { useState, useEffect } from 'react';

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
import UserProfile from './components/ui/UserProfile';

// Data
import { shoeData } from './data/products';

import ProductQuickViewModal from './components/ui/ProductQuickViewModal';

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [initialProfileTab, setInitialProfileTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsProfileOpen(false);
  };

  const openProfile = (tab = 'profile') => {
    setInitialProfileTab(tab);
    setIsProfileOpen(true);
  };

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const normalizePrice = (p) => {
    if (typeof p === 'number') return p;
    return Number(String(p).replace(/[^0-9.]/g, '')) || 0;
  };

  const addToCart = (product, size) => {
    const current = JSON.parse(localStorage.getItem('cart') || '[]');
    const exist = current.find((x) => String(x.id) === String(product.id));

    const parsedPrice = normalizePrice(product.price);
    const SIZE_DEFAULT = '42';

    let next;
    if (exist) {
      next = current.map((x) =>
        String(x.id) === String(product.id)
          ? { ...x, qty: (Number(x.qty) || 1) + 1, size: size || x.size || SIZE_DEFAULT }
          : x
      );
    } else {
      next = [
        ...current,
        {
          id: product.id,
          title: product.title,
          brand: product.brand,
          price: parsedPrice,
          image: product.image,
          qty: 1,
          size: size || SIZE_DEFAULT,
        },
      ];
    }

    localStorage.setItem('cart', JSON.stringify(next));
  };


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (response.ok) {
          const data = await response.json();
          // Map backend data to frontend format
          const formattedProducts = data.map(p => ({
            id: p._id,
            title: p.name,
            brand: p.brand,
            price: p.price.toLocaleString('vi-VN'),
            image: p.image,
            soldCount: Math.floor(Math.random() * 1000) + "+", // Fake sold count for now as backend doesn't have it
            isNew: true // Or some logic based on date
          }));
          setProducts(formattedProducts);
        } else {
          console.error('Failed to fetch products');
          setProducts(shoeData); // Fallback to static data
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts(shoeData); // Fallback to static data
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-[#fafafa] font-sans selection:bg-[#95c0a4] selection:text-black">
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} setUser={setUser} />
      <UserProfile 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        user={user} 
        onLogout={handleLogout} 
        initialTab={initialProfileTab}
      />
      <Navbar onUserClick={(tab) => user ? openProfile(tab) : setIsLoginOpen(true)} user={user} onLogout={handleLogout} />

      <ProductQuickViewModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={selectedProduct}
        onAddToCart={(product, size) => {
          addToCart(product, size);
        }}
        onBuyNow={(product, size) => {
          addToCart(product, size);
          setIsProductModalOpen(false);
          window.location.href = '/checkout';
        }}
      />

      <main className="pt-24 pb-24 max-w-[1600px] mx-auto px-4 md:px-10">
        <HeroSection />
        <CategoriesSection />

        {loading ? (
          <div className="py-20 text-center">Đang tải sản phẩm...</div>
        ) : (
          <>
            <ProductsSection
              title="Đề xuất cho bạn"
              subtitle="Dựa trên phong cách và sở thích cá nhân của bạn"
              products={products.length > 0 ? products : shoeData}
              onOpenDetail={openProductDetail}
            />

            <PromoBanners />

            <ProductsSection
              title="Hàng mới cập bến"
              subtitle="Cập nhật những xu hướng mới nhất từ thị trường toàn cầu"
              products={products.length > 0 ? [...products].reverse() : [...shoeData].reverse()}
              forceNew={true}
              keyPrefix="new-"
              onOpenDetail={openProductDetail}
            />
          </>
        )}

        <PartnersSection />
      </main>


      <Footer />
    </div>
  );
}