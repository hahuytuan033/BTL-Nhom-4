import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  User, 
  ShoppingBag, 
  ChevronRight, 
  TrendingUp, 
  CheckCircle2,
  Github,
  FacebookIcon,
  Instagram,
  Twitter,
  ArrowRight,
  X 
} from 'lucide-react';

/**
 * THÀNH PHẦN: Card sản phẩm
 */
const ProductCard = ({ title, brand, price, image, soldCount, isNew }) => (
  <div className="group flex flex-col bg-[#121212] border border-zinc-800 rounded-sm overflow-hidden hover:border-[#95c0a4] transition-all duration-300 cursor-pointer">
    <div className="relative aspect-square overflow-hidden bg-zinc-900 flex items-center justify-center p-4">
      {isNew && (
        <span className="absolute top-2 left-2 bg-[#95c0a4] text-[#0f0f0f] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
          Mới
        </span>
      )}
      <img 
        src={image} 
        alt={title} 
        className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-500"
        onError={(e) => { e.target.src = "https://via.placeholder.com/300?text=Product"; }}
      />
    </div>
    <div className="p-3 flex flex-col gap-1">
      <p className="text-[#cfcfcf] text-[12px] font-medium uppercase tracking-wider">{brand}</p>
      <h3 className="text-[#fafafa] text-[14px] font-bold line-clamp-1 group-hover:text-[#95c0a4] transition-colors">{title}</h3>
      <div className="mt-2 flex flex-col">
        <span className="text-[#fafafa] text-[18px] font-bold">₫{price}</span>
        <div className="flex items-center gap-1 mt-1">
          <div className="bg-zinc-800 px-1.5 py-0.5 rounded text-[10px] text-[#cfcfcf] flex items-center gap-1">
            <TrendingUp size={10} className="text-[#95c0a4]" />
            <span>{soldCount} lượt bán</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Title
 */
const SectionHeader = ({ title, subtitle }) => (
  <div className="flex justify-between items-end mb-6">
    <div>
      <h2 className="text-[#fafafa] text-[24px] font-bold uppercase italic tracking-tighter">{title}</h2>
      {subtitle && <p className="text-[#cfcfcf] text-[14px] mt-1">{subtitle}</p>}
    </div>
    <button className="text-[#95c0a4] text-[14px] font-bold flex items-center gap-1 hover:underline underline-offset-4">
      Xem tất cả <ChevronRight size={16} />
    </button>
  </div>
);

/**
 * Login
 */
const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-[#1a1a1a] w-full max-w-4xl h-[600px] flex overflow-hidden rounded-md border border-zinc-800 animate-in fade-in zoom-in duration-300">
        
        {/* Close Button ở đây */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Đặt hình ảnh sản phẩm bên trái */}
        <div className="hidden md:block w-1/2 relative">
          <img 
            src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop" 
            alt="Sneakers background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
             <div className="w-12 h-12 bg-[#95c0a4] rounded-sm flex items-center justify-center rotate-3">
              <span className="text-black font-black text-xl italic">N4</span>
            </div>
          </div>
        </div>

        {/* Form đăng nhập dặt bên phải */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 lg:p-12 bg-black">
          <div className="max-w-md w-full mx-auto space-y-6">
            <div className="space-y-2">
              <h2 className="text-[#fafafa] text-3xl font-bold">Chào mừng tới BTL-N4</h2>
              <p className="text-[#cfcfcf] text-sm">Nhập email của bạn để Đăng ký hoặc Đăng nhập</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <input 
                  type="email" 
                  placeholder="Địa chỉ Email *" 
                  className="w-full bg-[#121212] border border-zinc-800 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-[#95c0a4] transition-all"
                />
              </div>

              <p className="text-[10px] text-[#cfcfcf]/60 leading-tight">
                Bằng cách tiếp tục, bạn đồng ý với <span className="text-[#95c0a4] cursor-pointer hover:underline">Điều khoản Dịch vụ</span> và <span className="text-[#95c0a4] cursor-pointer hover:underline">Chính sách Bảo mật</span> của chúng tôi.
              </p>

              <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-[#cfcfcf] font-bold py-3 rounded-md transition-colors uppercase text-sm tracking-widest">
                Tiếp tục
              </button>
            </div>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-800"></span>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]">
                <span className="bg-black px-4 text-zinc-500">Hoặc</span>
              </div>
            </div>

            {/* Các button mạng xã hội */}
            <div className="flex justify-center gap-4">
              <button className="p-3 border border-zinc-800 rounded-md hover:bg-zinc-900 transition-colors">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              </button>
              <button className="p-3 border border-zinc-800 rounded-md hover:bg-zinc-900 transition-colors">
                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5" alt="Facebook" />
              </button>
              <button className="p-3 border border-zinc-800 rounded-md hover:bg-zinc-900 transition-colors">
                <img src="https://www.svgrepo.com/show/303108/apple-black-logo.svg" className="w-5 h-5 invert" alt="Apple" />
              </button>
              <button className="p-3 border border-zinc-800 rounded-md hover:bg-zinc-900 transition-colors">
                <Twitter className="w-5 h-5 text-white" fill="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shoeData = [
    { id: 1, brand: "Jordan", title: "Jordan 1 Retro Low OG Travis Scott", price: "32.500.000", soldCount: "1.2k", image: "https://images.stockx.com/360/Air-Jordan-1-Retro-Low-OG-Travis-Scott-Canary-W/Images/Air-Jordan-1-Retro-Low-OG-Travis-Scott-Canary-W/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=1&updated_at=1715094247", isNew: true },
    { id: 2, brand: "Nike", title: "Nike Dunk Low Retro White Black Panda", price: "3.200.000", soldCount: "45k", image: "https://images.stockx.com/360/Nike-Dunk-Low-Retro-White-Black-2021/Images/Nike-Dunk-Low-Retro-White-Black-2021/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=1&updated_at=1635243385" },
    { id: 3, brand: "Adidas", title: "Adidas Samba OG Cloud White Core Black", price: "2.800.000", soldCount: "12k", image: "https://images.stockx.com/360/adidas-Samba-OG-Cloud-White-Core-Black/Images/adidas-Samba-OG-Cloud-White-Core-Black/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=1&updated_at=1680517565" },
    { id: 4, brand: "Fear of God", title: "FOG Essentials Hoodie Black", price: "2.500.000", soldCount: "8k", image: "https://images.stockx.com/360/Fear-of-God-Essentials-Hoodie-Light-Oatmeal/Images/Fear-of-God-Essentials-Hoodie-Light-Oatmeal/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=1&updated_at=1664390022" },
    { id: 5, brand: "Yeezy", title: "Yeezy Boost 350 V2 Bone", price: "6.100.000", soldCount: "5k", image: "https://images.stockx.com/360/adidas-Yeezy-Boost-350-V2-Bone/Images/adidas-Yeezy-Boost-350-V2-Bone/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=1&updated_at=1646237255" },
    { id: 6, brand: "New Balance", title: "New Balance 1906R Silver Metallic", price: "4.500.000", soldCount: "2k", image: "https://images.stockx.com/360/New-Balance-1906R-Metallic-Silver-Royal/Images/New-Balance-1906R-Metallic-Silver-Royal/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=1&updated_at=1672322442" },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-[#fafafa] font-sans selection:bg-[#95c0a4] selection:text-black">
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      {/* THANH ĐIỀU HƯỚNG */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-zinc-800 py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between gap-8">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-[#95c0a4] rounded-sm flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
              <span className="text-black font-black text-xl italic">N4</span>
            </div>
            <h1 className="text-2xl font-black tracking-tighter italic hidden sm:block">BTL-N4</h1>
          </div>

          {/* Tìm kiếm */}
          <div className="flex-1 max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm theo tên sản phẩm, thương hiệu..." 
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-sm py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#95c0a4] focus:ring-1 focus:ring-[#95c0a4] transition-all"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <nav className="hidden lg:flex items-center gap-6 text-sm font-bold uppercase tracking-tight">
              <a href="#" className="hover:text-[#95c0a4] transition-colors">Duyệt</a>
              <a href="#" className="hover:text-[#95c0a4] transition-colors">Bán</a>
              <a href="#" className="hover:text-[#95c0a4] transition-colors">Trợ giúp</a>
            </nav>
            <div className="flex items-center gap-4">
              <User 
                className="cursor-pointer hover:text-[#95c0a4] transition-colors" 
                size={22} 
                onClick={() => setIsLoginOpen(true)}
              />
              <div className="relative">
                <ShoppingBag className="cursor-pointer hover:text-[#95c0a4] transition-colors" size={22} />
                <span className="absolute -top-2 -right-2 bg-[#95c0a4] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
              </div>
              <Menu className="lg:hidden cursor-pointer" size={24} />
            </div>
          </div>
        </div>
      </nav>

      {/* NỘI DUNG CHÍNH */}
      <main className="pt-24 pb-20 max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* HERO BANNER */}
        <div className="relative w-full h-[450px] bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-sm overflow-hidden mb-12">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 md:px-20 max-w-3xl">
            <div className="bg-[#95c0a4] text-black text-xs font-black px-2 py-1 w-fit mb-4 uppercase">Độc quyền tại BTL-N4</div>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-tight mb-6">
              NÂNG TẦM <br />PHONG CÁCH
            </h1>
            <p className="text-lg text-[#cfcfcf] mb-8 max-w-md">
              Khám phá bộ sưu tập sneakers và streetwear hot nhất thế giới với mức giá cạnh tranh nhất thị trường.
            </p>
            <div className="flex gap-4">
              <button className="bg-[#fafafa] text-black px-8 py-3 font-bold uppercase text-sm hover:bg-[#95c0a4] transition-colors flex items-center gap-2">
                Mua ngay <ArrowRight size={16} />
              </button>
              <button className="border border-[#fafafa] text-[#fafafa] px-8 py-3 font-bold uppercase text-sm hover:bg-[#fafafa]/10 transition-colors">
                Bán sản phẩm
              </button>
            </div>
          </div>
        </div>

        {/* CATEGORY FAST NAV */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16">
          {['Sneakers', 'Streetwear', 'Collectibles', 'Handbags', 'Watches', 'Electronics'].map((cat) => (
            <div key={cat} className="bg-zinc-900 border border-zinc-800 p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-zinc-800 transition-colors rounded-sm group">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-[#95c0a4] transition-colors">
                <CheckCircle2 className="text-[#cfcfcf] group-hover:text-black" size={20} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">{cat}</span>
            </div>
          ))}
        </div>

        {/* SECTION 1: RECOMMENDATIONS */}
        <section className="mb-16">
          <SectionHeader title="Đề xuất cho bạn" subtitle="Dựa trên phong cách và lịch sử xem của bạn" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {shoeData.map(item => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>
        </section>

        {/* GREEN PROMO BANNER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-[#95c0a4] p-10 rounded-sm flex flex-col justify-center relative overflow-hidden group cursor-pointer">
            <div className="relative z-10">
              <h3 className="text-black text-3xl font-black italic uppercase leading-none mb-4">UPGRADE YOUR<br />WRIST GAME</h3>
              <p className="text-black/70 text-sm font-medium mb-6 max-w-[250px]">Khám phá bộ sưu tập đồng hồ cao cấp từ Rolex, Omega và Casio.</p>
              <button className="bg-black text-white px-6 py-2 text-xs font-bold uppercase rounded-sm hover:bg-zinc-800 transition-colors">Xem bộ sưu tập</button>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] w-64 h-64 bg-black/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
          </div>
          <div className="bg-[#0f0f0f] border border-zinc-800 p-10 rounded-sm flex flex-col justify-center relative overflow-hidden group cursor-pointer">
            <div className="relative z-10">
              <h3 className="text-[#95c0a4] text-3xl font-black italic uppercase leading-none mb-4">STREETWEAR<br />MUST HAVES</h3>
              <p className="text-[#cfcfcf] text-sm font-medium mb-6 max-w-[250px]">Essentials, Supreme, Stüssy - Những item không thể thiếu trong tủ đồ.</p>
              <button className="bg-[#95c0a4] text-black px-6 py-2 text-xs font-bold uppercase rounded-sm hover:bg-[#fafafa] transition-colors">Khám phá ngay</button>
            </div>
            <div className="absolute right-[-20px] top-[-20px] w-64 h-64 bg-[#95c0a4]/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* SECTION 2: NEW ARRIVALS */}
        <section className="mb-16">
          <SectionHeader title="Hàng mới về" subtitle="Những sản phẩm vừa cập bến kho BTL-N4" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...shoeData].reverse().map(item => (
              <ProductCard key={item.id} {...item} isNew={true} />
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-zinc-900 border-t border-zinc-800 pt-16 pb-8">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">
            <div className="col-span-2 lg:col-span-1">
               <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#95c0a4] rounded-sm flex items-center justify-center rotate-3">
                  <span className="text-black font-black text-lg italic">N4</span>
                </div>
                <h1 className="text-xl font-black tracking-tighter italic">BTL-N4</h1>
              </div>
              <p className="text-[#cfcfcf] text-sm mb-6 leading-relaxed">
                Nền tảng giao dịch sneakers, streetwear và đồ sưu tầm uy tín nhất tại Việt Nam.
              </p>
              <div className="flex gap-4">
                <Instagram size={20} className="text-[#cfcfcf] cursor-pointer hover:text-[#95c0a4]" />
                <FacebookIcon size={20} className="text-[#cfcfcf] cursor-pointer hover:text-[#95c0a4]" />
                <Twitter size={20} className="text-[#cfcfcf] cursor-pointer hover:text-[#95c0a4]" />
                <Github size={20} className="text-[#cfcfcf] cursor-pointer hover:text-[#95c0a4]" />
              </div>
            </div>
            
            <div>
              <h4 className="text-[#fafafa] font-bold text-sm uppercase tracking-wider mb-6">Mua sắm</h4>
              <ul className="flex flex-col gap-4 text-sm text-[#cfcfcf]">
                <li className="hover:text-[#95c0a4] cursor-pointer">Xác thực sản phẩm</li>
                <li className="hover:text-[#95c0a4] cursor-pointer">Câu hỏi thường gặp</li>
                <li className="hover:text-[#95c0a4] cursor-pointer">Giao hàng & Trả hàng</li>
                <li className="hover:text-[#95c0a4] cursor-pointer">Ưu đãi thành viên</li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#fafafa] font-bold text-sm uppercase tracking-wider mb-6">Bán hàng</h4>
              <ul className="flex flex-col gap-4 text-sm text-[#cfcfcf]">
                <li className="hover:text-[#95c0a4] cursor-pointer">Hướng dẫn người bán</li>
                <li className="hover:text-[#95c0a4] cursor-pointer">Phí giao dịch</li>
                <li className="hover:text-[#95c0a4] cursor-pointer">Tiêu chuẩn sản phẩm</li>
                <li className="hover:text-[#95c0a4] cursor-pointer">Thanh toán</li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#fafafa] font-bold text-sm uppercase tracking-wider mb-6">BTL-N4</h4>
              <ul className="flex flex-col gap-4 text-sm text-[#cfcfcf]">
                <li className="hover:text-[#95c0a4] cursor-pointer">Về chúng tôi</li>
                <li className="hover:text-[#95c0a4] cursor-pointer">Liên hệ</li>
                <li className="hover:text-[#95c0a4] cursor-pointer">Blog thời trang</li>
                <li className="hover:text-[#95c0a4] cursor-pointer">Tuyển dụng</li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <h4 className="text-[#fafafa] font-bold text-sm uppercase tracking-wider mb-6">Đăng ký nhận tin</h4>
              <p className="text-[#cfcfcf] text-xs mb-4">Cập nhật những mẫu giày mới nhất và tin tức thị trường hàng tuần.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email của bạn" 
                  className="bg-black border border-zinc-800 px-4 py-2 text-xs flex-1 focus:outline-none focus:border-[#95c0a4] text-white"
                />
                <button className="bg-[#95c0a4] text-black font-bold px-4 py-2 text-xs uppercase">Gửi</button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-500 uppercase tracking-[0.2em]">
            <p>© 2026 BTL-N4. TẤT CẢ QUYỀN ĐƯỢC BẢO LƯU.</p>
            <div className="flex gap-6">
              <span className="hover:text-[#fafafa] cursor-pointer">Điều khoản dịch vụ</span>
              <span className="hover:text-[#fafafa] cursor-pointer">Chính sách bảo mật</span>
              <span className="hover:text-[#fafafa] cursor-pointer">Cookie Settings</span>
            </div>
            <div className="flex items-center gap-1 font-bold text-[#fafafa]">
              <span className="w-2 h-2 rounded-full bg-[#95c0a4]"></span>
              VIỆT NAM | VI
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}