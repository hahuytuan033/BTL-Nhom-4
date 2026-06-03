import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Sections
import HeroSection from './components/sections/HeroSection';
import CategoriesSection from './components/sections/CategoriesSection';
import ProductsSection from './components/sections/ProductsSection';
import PromoBanners from './components/sections/PromoBanners';
import PartnersSection from './components/sections/PartnersSection';

// Pages
import ProductDetail from './pages/ProductDetail';

// UI
import LoginModal from './components/ui/LoginModal';
import UserProfile from './components/ui/UserProfile';
import CheckoutModal from './components/ui/CheckoutModal';

// Data


function ProductDetailWrapper({ products, onBack, cart, onAddToCart, onUpdateCartItemQuantity, onRemoveFromCart, onOpenCheckout }) {
  const { id } = useParams();
  const product = products.find(p => p.id.toString() === id);

  return (
    <ProductDetail 
      product={product} 
      onBack={onBack} 
      cart={cart}
      onAddToCart={onAddToCart}
      onUpdateCartItemQuantity={onUpdateCartItemQuantity}
      onRemoveFromCart={onRemoveFromCart}
      onOpenCheckout={onOpenCheckout}
    />
  );
}

export default function App() {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [initialProfileTab, setInitialProfileTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [checkoutData, setCheckoutData] = useState({ isOpen: false, items: [] });

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const handleBack = () => {
    navigate('/');
  };

  // Helper to sync cart with local/database storage
  const syncCartToDb = async (newCart) => {
    if (user) {
      try {
        const cartItems = newCart.map(item => ({
          productId: item.product.id.toString(),
          size: item.size,
          color: item.color,
          quantity: item.quantity
        }));
        await fetch('http://localhost:5000/api/users/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email, cartItems })
        });
      } catch (error) {
        console.error('Error syncing cart to database:', error);
      }
    } else {
      localStorage.setItem('guestCart', JSON.stringify(newCart));
    }
  };

  const addToCart = (product, color, size, quantity) => {
    setCart(prevCart => {
      const itemId = `${product.id}-${color}-${size}`;
      const existingIndex = prevCart.findIndex(item => item.id === itemId);
      let updatedCart;
      if (existingIndex > -1) {
        updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += quantity;
      } else {
        const newItem = {
          id: itemId,
          product: product,
          color: color,
          size: size,
          quantity: quantity
        };
        updatedCart = [...prevCart, newItem];
      }
      syncCartToDb(updatedCart);
      return updatedCart;
    });
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0);
      syncCartToDb(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== itemId);
      syncCartToDb(updatedCart);
      return updatedCart;
    });
  };

  // Sync / Load cart based on login status
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const response = await fetch(`http://localhost:5000/api/users/cart?email=${user.email}`);
          if (response.ok) {
            const dbCart = await response.json();
            const mappedCart = dbCart.map(item => {
              const product = products.find(p => p.id.toString() === item.productId);
              
              const productObj = product || {
                id: item.productId,
                title: 'Sản phẩm đang tải...',
                brand: 'N4',
                price: '0',
                image: 'https://via.placeholder.com/300?text=Sneaker',
                soldCount: '0',
              };

              return {
                id: `${item.productId}-${item.color}-${item.size}`,
                product: productObj,
                color: item.color,
                size: item.size,
                quantity: item.quantity
              };
            });
            setCart(mappedCart);
          }
        } catch (error) {
          console.error('Error fetching cart from DB:', error);
        }
      } else {
        const localCart = localStorage.getItem('guestCart');
        if (localCart) {
          try {
            setCart(JSON.parse(localCart));
          } catch (e) {
            console.error('Error parsing guest cart:', e);
          }
        } else {
          setCart([]);
        }
      }
    };

    loadCart();
  }, [user, products]);

  const handleOpenCheckout = (items) => {
    setCheckoutData({ isOpen: true, items });
  };

  const handleCheckoutSuccess = (itemIds) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => !itemIds.includes(item.id));
      syncCartToDb(updatedCart);
      return updatedCart;
    });
  };

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
    setCart([]);
    setIsProfileOpen(false);
  };

  const openProfile = (tab = 'profile') => {
    setInitialProfileTab(tab);
    setIsProfileOpen(true);
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
            price: p.price ? p.price.toLocaleString('vi-VN') : '0',
            image: p.image,
            soldCount: Math.floor(Math.random() * 1000) + "+",
            isNew: true
          }));
          setProducts(formattedProducts);
        } else {
          console.error('Failed to fetch products');
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-[#fafafa] font-sans selection:bg-[#95c0a4] selection:text-black">
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} setUser={setUser} />
      <CheckoutModal 
        isOpen={checkoutData.isOpen} 
        onClose={() => setCheckoutData({ isOpen: false, items: [] })} 
        items={checkoutData.items} 
        user={user} 
        onCheckoutSuccess={handleCheckoutSuccess}
      />
      <UserProfile 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        user={user} 
        onLogout={handleLogout} 
        initialTab={initialProfileTab}
        cart={cart}
        onUpdateCartItemQuantity={updateCartItemQuantity}
        onRemoveFromCart={removeFromCart}
        onOpenCheckout={handleOpenCheckout}
      />
      <Navbar onUserClick={(tab) => user ? openProfile(tab) : setIsLoginOpen(true)} user={user} onLogout={handleLogout} cart={cart} />

      <main className="pt-24 pb-24 max-w-[1600px] mx-auto px-4 md:px-10">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <HeroSection />
                <CategoriesSection />

                {loading ? (
                  <div className="py-20 text-center text-[#95c0a4] font-bold">Đang tải sản phẩm...</div>
                ) : (
                  <>
                    <ProductsSection
                      title="Đề xuất cho bạn"
                      subtitle="Dựa trên phong cách và sở thích cá nhân của bạn"
                      products={products}
                      onProductClick={handleProductClick}
                    />

                    <PromoBanners />

                    <ProductsSection
                      title="Hàng mới cập bến"
                      subtitle="Cập nhật những xu hướng mới nhất từ thị trường toàn cầu"
                      products={[...products].reverse()}
                      forceNew={true}
                      keyPrefix="new-"
                      onProductClick={handleProductClick}
                    />
                  </>
                )}

                <PartnersSection />
              </>
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <ProductDetailWrapper 
                products={products} 
                onBack={handleBack} 
                cart={cart}
                onAddToCart={addToCart}
                onUpdateCartItemQuantity={updateCartItemQuantity}
                onRemoveFromCart={removeFromCart}
                onOpenCheckout={handleOpenCheckout}
              />
            } 
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
