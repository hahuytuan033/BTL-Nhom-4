import { Zap } from 'lucide-react';

/**
 * Hai banner quảng cáo song song (Watches + Streetwear)
 */
const PromoBanners = () => (
  <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
    {/* Banner Watches */}
    <div className="relative group overflow-hidden rounded-sm bg-[#95c0a4] p-12 min-h-[350px] flex flex-col justify-center cursor-pointer">
      <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-20 group-hover:opacity-40 transition-opacity">
        <img src="https://www.svgrepo.com/show/303123/rolex-logo.svg" className="w-full h-full object-contain p-10 rotate-12 group-hover:rotate-0 transition-transform duration-700" alt="decor" />
      </div>
      <div className="relative z-10 max-w-sm">
        <h3 className="text-black text-4xl font-black italic uppercase leading-[0.9] mb-6">UPGRADE YOUR WRIST GAME</h3>
        <p className="text-black/70 text-sm font-bold mb-8 uppercase tracking-tight">Tuyển tập đồng hồ xa xỉ từ các thương hiệu hàng đầu thế giới.</p>
        <button className="bg-black text-white px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">KHÁM PHÁ BỘ SƯU TẬP</button>
      </div>
    </div>
    
    {/* Banner Streetwear */}
    <div className="relative group overflow-hidden rounded-sm bg-zinc-900 border border-zinc-800 p-12 min-h-[350px] flex flex-col justify-center cursor-pointer">
      <div className="absolute right-0 top-0 w-64 h-64 bg-[#95c0a4]/5 rounded-full blur-[100px] group-hover:bg-[#95c0a4]/10 transition-all"></div>
      <div className="relative z-10 max-w-sm">
        <h3 className="text-[#95c0a4] text-4xl font-black italic uppercase leading-[0.9] mb-6">STREETWEAR MUST-HAVES</h3>
        <p className="text-zinc-400 text-sm font-bold mb-8 uppercase tracking-tight">Những Item Essentials và Supreme đang làm mưa làm gió thị trường.</p>
        <button className="bg-[#fafafa] text-black px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#95c0a4] transition-all shadow-xl">XEM NGAY</button>
      </div>
      <div className="absolute -right-10 bottom-0 w-64 h-64 flex items-center justify-center opacity-10">
         <Zap size={200} className="text-white" strokeWidth={1} />
      </div>
    </div>
  </section>
);

export default PromoBanners;
