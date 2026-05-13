import { useState, useEffect } from 'react';
import { Search, Menu, User, ShoppingBag } from 'lucide-react';

/**
 * Thanh điều hướng chính
 * Có hiệu ứng trong suốt khi ở đầu trang, đổi nền khi scroll
 */
const Navbar = ({ onLoginClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-zinc-800 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 flex items-center justify-between gap-6 md:gap-12">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group shrink-0">
          <div className="w-10 h-10 bg-[#95c0a4] rounded-sm flex items-center justify-center rotate-3 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-[#95c0a4]/20">
            <span className="text-black font-black text-2xl italic">N4</span>
          </div>
          <h1 className="text-2xl font-black tracking-tighter italic hidden sm:block">BTL-N4</h1>
        </div>

        {/* Thanh tìm kiếm trung tâm */}
        <div className="flex-1 max-w-2xl relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#95c0a4] transition-colors" size={18} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm giày, thương hiệu, phong cách..." 
            className="w-full bg-zinc-900/40 border border-zinc-800 rounded-sm py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#95c0a4] focus:bg-zinc-900/80 transition-all"
          />
        </div>

        {/* Hành động người dùng */}
        <div className="flex items-center gap-4 md:gap-8">
          <nav className="hidden xl:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-[#95c0a4] transition-colors border-b-2 border-transparent hover:border-[#95c0a4] pb-1">DUYỆT HÀNG</a>
            <a href="#" className="hover:text-[#95c0a4] transition-colors border-b-2 border-transparent hover:border-[#95c0a4] pb-1">KÝ GỬI</a>
            <a href="#" className="hover:text-[#95c0a4] transition-colors border-b-2 border-transparent hover:border-[#95c0a4] pb-1">TIN TỨC</a>
          </nav>
          
          <div className="flex items-center gap-4 md:gap-5">
            <div 
              className="cursor-pointer p-2 hover:bg-zinc-800 rounded-full transition-all group"
              onClick={onLoginClick}
            >
              <User className="group-hover:text-[#95c0a4] transition-colors" size={22} />
            </div>
            <div className="relative p-2 hover:bg-zinc-800 rounded-full transition-all group cursor-pointer">
              <ShoppingBag className="group-hover:text-[#95c0a4] transition-colors" size={22} />
              <span className="absolute top-1 right-1 bg-[#95c0a4] text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-black">2</span>
            </div>
            <Menu className="lg:hidden cursor-pointer hover:text-[#95c0a4]" size={24} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
