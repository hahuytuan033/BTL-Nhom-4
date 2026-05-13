import { TrendingUp } from 'lucide-react';

/**
 * THÀNH PHẦN: Card sản phẩm
 * Hiển thị thông tin chi tiết về sản phẩm với hiệu ứng hover
 */
const ProductCard = ({ title, brand, price, image, soldCount, isNew }) => (
  <div className="group flex flex-col bg-[#121212] border border-zinc-800 rounded-sm overflow-hidden hover:border-[#95c0a4] transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[#95c0a4]/10">
    <div className="relative aspect-square overflow-hidden bg-zinc-900 flex items-center justify-center p-4">
      {isNew && (
        <span className="absolute top-3 left-3 z-10 bg-[#95c0a4] text-[#0f0f0f] text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-tighter shadow-sm">
          MỚI
        </span>
      )}
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out"
        loading="lazy"
        onError={(e) => { e.target.src = "https://via.placeholder.com/300?text=Sneaker"; }}
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <button className="bg-[#fafafa] text-black text-[10px] font-bold px-4 py-2 rounded-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 uppercase">
          Xem nhanh
        </button>
      </div>
    </div>
    <div className="p-4 flex flex-col gap-1 flex-grow">
      <p className="text-[#95c0a4] text-[10px] font-bold uppercase tracking-widest">{brand}</p>
      <h3 className="text-[#fafafa] text-[14px] font-bold line-clamp-2 min-h-[40px] leading-tight group-hover:text-[#95c0a4] transition-colors">{title}</h3>
      <div className="mt-auto pt-3 flex flex-col">
        <span className="text-[#fafafa] text-[18px] font-black tracking-tight">₫{price}</span>
        <div className="flex items-center gap-2 mt-2">
          <div className="bg-zinc-800/80 px-2 py-1 rounded text-[10px] text-[#cfcfcf] flex items-center gap-1.5">
            <TrendingUp size={10} className="text-[#95c0a4]" />
            <span>{soldCount} lượt bán</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductCard;
