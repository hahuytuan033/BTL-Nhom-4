import { partnerBrands } from '../../data/products';

/**
Section hiển thị danh sách đối tác tin cậy
 */
const PartnersSection = () => (
  <section className="py-20 border-t border-zinc-900 mt-20">
    <p className="text-center text-[10px] text-zinc-500 uppercase tracking-[0.4em] mb-12 font-black">ĐỐI TÁC TIN CẬY</p>
    <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
       {partnerBrands.map(brand => (
         <span key={brand} className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase">{brand}</span>
       ))}
    </div>
  </section>
);

export default PartnersSection;
