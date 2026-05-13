import { ChevronRight } from 'lucide-react';

/**
 * Header cho các phần chính của trang
 */
const SectionHeader = ({ title, subtitle }) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
    <div className="border-l-4 border-[#95c0a4] pl-4">
      <h2 className="text-[#fafafa] text-2xl md:text-3xl font-black uppercase italic tracking-tighter">{title}</h2>
      {subtitle && <p className="text-[#cfcfcf] text-sm mt-1 font-medium">{subtitle}</p>}
    </div>
    <button className="text-[#95c0a4] text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all group underline-offset-8 hover:underline">
      XEM TẤT CẢ <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
);

export default SectionHeader;
