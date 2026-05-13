import { Instagram, Facebook as FacebookIcon, Twitter, Github } from 'lucide-react';
import { footerServices, footerSupport } from '../../data/products';

const Footer = () => (
  <footer className="bg-[#050505] border-t border-zinc-900 pt-24 pb-12">
    <div className="max-w-[1600px] mx-auto px-4 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
        
        {/* Thông tin thương hiệu */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#95c0a4] rounded-sm flex items-center justify-center rotate-3">
              <span className="text-black font-black text-2xl italic">N4</span>
            </div>
            <h1 className="text-2xl font-black tracking-tighter italic">BTL-N4</h1>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
            Nền tảng giao dịch sneakers, streetwear và đồ sưu tầm uy tín nhất tại Việt Nam. Chúng tôi cam kết 100% hàng chính hãng qua quy trình kiểm duyệt nghiêm ngặt.
          </p>
          <div className="flex gap-6">
            {[
              { Icon: Instagram },
              { Icon: FacebookIcon },
              { Icon: Twitter },
              { Icon: Github },
            ].map(({ Icon }, idx) => (
              <a key={idx} href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-[#95c0a4] hover:text-black transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        
        {/* Dịch vụ */}
        <div>
          <h4 className="text-[#fafafa] font-black text-[11px] uppercase tracking-[0.3em] mb-8 border-b border-zinc-800 pb-2 w-fit">DỊCH VỤ</h4>
          <ul className="space-y-4 text-sm text-zinc-400 font-medium">
            {footerServices.map((item, idx) => (
              <li key={idx} className="hover:text-[#95c0a4] cursor-pointer transition-colors">{item}</li>
            ))}
          </ul>
        </div>

        {/* Hỗ trợ */}
        <div>
          <h4 className="text-[#fafafa] font-black text-[11px] uppercase tracking-[0.3em] mb-8 border-b border-zinc-800 pb-2 w-fit">HỖ TRỢ</h4>
          <ul className="space-y-4 text-sm text-zinc-400 font-medium">
            {footerSupport.map((item, idx) => (
              <li key={idx} className="hover:text-[#95c0a4] cursor-pointer transition-colors">{item}</li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-8">
          <h4 className="text-[#fafafa] font-black text-[11px] uppercase tracking-[0.3em] mb-8 border-b border-zinc-800 pb-2 w-fit">NEWSLETTER</h4>
          <p className="text-zinc-500 text-xs leading-relaxed uppercase tracking-tighter">Đừng bỏ lỡ các đợt Drop giới hạn và ưu đãi độc quyền hàng tuần.</p>
          <div className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="EMAIL CỦA BẠN" 
              className="bg-zinc-900/50 border border-zinc-800 px-4 py-3 text-[10px] font-bold focus:outline-none focus:border-[#95c0a4] text-white tracking-widest"
            />
            <button className="bg-[#95c0a4] text-black font-black px-4 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all">ĐĂNG KÝ</button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-zinc-600 font-black uppercase tracking-[0.3em]">
        <p>© 2026 BTL-N4 ECOSYSTEM. ALL RIGHTS RESERVED.</p>
        <div className="flex flex-wrap justify-center gap-8">
          <span className="hover:text-white cursor-pointer transition-colors">Điều khoản</span>
          <span className="hover:text-white cursor-pointer transition-colors">Bảo mật</span>
          <span className="hover:text-white cursor-pointer transition-colors">Cookies</span>
        </div>
        <div className="flex items-center gap-2 text-white bg-zinc-900 px-4 py-1.5 rounded-full border border-zinc-800">
          <span className="w-1.5 h-1.5 rounded-full bg-[#95c0a4] animate-pulse"></span>
          VIETNAM | VNĐ
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
