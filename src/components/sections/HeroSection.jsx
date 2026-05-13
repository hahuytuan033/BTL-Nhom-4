import { ShieldCheck, ArrowRight } from 'lucide-react';

/**
 * Hero Banner - Banner chính hiển thị đầu trang
 */
const HeroSection = () => (
  <section className="relative w-full h-[500px] md:h-[600px] rounded-sm overflow-hidden mb-16 group">
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>
    <img 
      src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop" 
      alt="Hero Visual" 
      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[10s] ease-out"
    />
    <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-20 max-w-4xl">
      <div className="inline-flex items-center gap-2 bg-[#95c0a4] text-black text-[10px] font-black px-3 py-1.5 w-fit mb-6 uppercase tracking-widest shadow-xl">
        <ShieldCheck size={12} /> CHÍNH HÃNG 100%
      </div>
      <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl">
        NÂNG TẦM <br />
        <span className="text-[#95c0a4]">PHONG CÁCH</span>
      </h1>
      <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-lg font-medium leading-relaxed">
        Khám phá bộ sưu tập sneakers và streetwear hiếm nhất hành tinh. Được kiểm duyệt bởi chuyên gia BTL-N4.
      </p>
      <div className="flex flex-wrap gap-4">
        <button className="bg-[#fafafa] text-black px-10 py-4 font-black uppercase text-xs tracking-widest hover:bg-[#95c0a4] transition-all duration-300 flex items-center gap-3 shadow-2xl">
          MUA NGAY <ArrowRight size={18} />
        </button>
        <button className="backdrop-blur-md bg-white/5 border border-white/20 text-[#fafafa] px-10 py-4 font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all duration-300">
          TÌM HIỂU THÊM
        </button>
      </div>
    </div>
    
    {/* Scroll Indicator */}
    <div className="absolute bottom-8 right-12 z-20 hidden md:flex flex-col items-center gap-4">
       <div className="w-[1px] h-20 bg-gradient-to-t from-[#95c0a4] to-transparent"></div>
       <span className="text-[10px] font-black uppercase tracking-[0.5em] rotate-90 origin-right translate-x-4">SCROLL</span>
    </div>
  </section>
);

export default HeroSection;
