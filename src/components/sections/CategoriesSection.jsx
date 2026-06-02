import React from 'react';
import { Zap, ShieldCheck, Star, TrendingUp, ShoppingBag, User } from 'lucide-react';
import { categoryNames } from '../../data/products';

/**
 * Map tên danh mục → icon tương ứng
 */
const categoryIcons = {
  "Giày Sneaker": <Zap size={20} />,
  "Thời Trang Đường Phố": <ShieldCheck size={20} />,
  "Đồng Hồ": <Star size={20} />,
  "Đồ Sưu Tầm": <TrendingUp size={20} />,
  "Túi Xách": <ShoppingBag size={20} />,
  "Trang Phục": <User size={20} />,
};

/**
 * Section hiển thị danh mục sản phẩm
 */
const CategoriesSection = () => (
  <section className="mb-20">
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {categoryNames.map((name, idx) => {
        const icon = categoryIcons[name];
        return (
          <div key={idx} className="bg-zinc-900/50 border border-zinc-800 p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-zinc-800/80 hover:border-[#95c0a4]/50 transition-all duration-300 rounded-sm group relative overflow-hidden">
            <div className="absolute -right-2 -bottom-2 text-zinc-800/20 group-hover:text-[#95c0a4]/10 transition-colors">
              {React.cloneElement(icon, { size: 60 })}
            </div>
            <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-[#95c0a4] group-hover:text-black transition-all duration-500 z-10 shadow-lg">
              {icon}
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] group-hover:text-[#95c0a4] transition-colors z-10">{name}</span>
          </div>
        );
      })}
    </div>
  </section>
);

export default CategoriesSection;
