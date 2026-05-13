import { useState } from 'react';
import { X, Twitter } from 'lucide-react';
import { socialLogins } from '../../data/products';

/**
 * Modal Đăng nhập/Đăng ký
 */
const LoginModal = ({ isOpen, onClose }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-all duration-300">
      <div className="relative bg-[#0a0a0a] w-full max-w-4xl min-h-[600px] flex flex-col md:flex-row overflow-hidden rounded-sm border border-zinc-800 animate-in fade-in zoom-in duration-500 shadow-2xl shadow-[#95c0a4]/5">
        
        {/* Nút đóng */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-[#95c0a4] hover:text-black rounded-full text-white transition-all duration-300"
        >
          <X size={20} />
        </button>

        {/* Hình ảnh trang trí (Trái) */}
        <div className="hidden md:block md:w-1/2 relative">
          <img 
            src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop" 
            alt="Sneakers background" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-10">
             <div className="w-16 h-16 bg-[#95c0a4] rounded-sm flex items-center justify-center rotate-6 mb-4 shadow-xl">
              <span className="text-black font-black text-2xl italic">N4</span>
            </div>
            <h3 className="text-white text-3xl font-black italic uppercase tracking-tighter leading-none mb-2">JOIN THE CLUB.</h3>
            <p className="text-zinc-400 text-sm">Hàng ngàn ưu đãi dành riêng cho thành viên BTL-N4.</p>
          </div>
        </div>

        {/* Form Nội dung (Phải) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 lg:p-12 bg-black overflow-y-auto max-h-[90vh] md:max-h-none scrollbar-hide">
          <div className="max-w-md w-full mx-auto space-y-6 my-auto">
            <div className="space-y-2">
              <h2 className="text-[#fafafa] text-3xl font-black tracking-tight uppercase italic">
                {isLoginMode ? 'Chào mừng trở lại' : 'Tạo tài khoản'}
              </h2>
              <p className="text-[#cfcfcf] text-sm">
                {isLoginMode ? 'Nhập thông tin của bạn để tiếp tục trải nghiệm cùng nhóm 4.' : 'Tham gia cộng đồng để nhận vô vàn ưu đãi độc quyền.'}
              </p>
            </div>

            <div className="space-y-4">
              {!isLoginMode && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Họ và tên</label>
                  <input 
                    type="text" 
                    placeholder="Nguyễn Văn A" 
                    className="w-full bg-[#121212] border border-zinc-800 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-[#95c0a4] focus:ring-1 focus:ring-[#95c0a4] transition-all placeholder:text-zinc-600"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Địa chỉ Email</label>
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="w-full bg-[#121212] border border-zinc-800 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-[#95c0a4] focus:ring-1 focus:ring-[#95c0a4] transition-all placeholder:text-zinc-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Mật khẩu</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-[#121212] border border-zinc-800 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-[#95c0a4] focus:ring-1 focus:ring-[#95c0a4] transition-all placeholder:text-zinc-600"
                />
              </div>

              {!isLoginMode && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Xác nhận Mật khẩu</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full bg-[#121212] border border-zinc-800 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-[#95c0a4] focus:ring-1 focus:ring-[#95c0a4] transition-all placeholder:text-zinc-600"
                  />
                </div>
              )}

              <div className="flex flex-col gap-3 pt-2">
                <button className="w-full bg-[#95c0a4] hover:bg-white text-black font-black py-4 rounded-sm transition-all duration-300 uppercase text-xs tracking-[0.2em] shadow-lg shadow-[#95c0a4]/10">
                  {isLoginMode ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ TÀI KHOẢN'}
                </button>
              </div>
            </div>

            <div className="relative flex items-center pt-2">
              <div className="flex-grow border-t border-zinc-800"></div>
              <span className="flex-shrink mx-4 text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-bold">Hoặc</span>
              <div className="flex-grow border-t border-zinc-800"></div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-4 gap-3">
              {socialLogins.map((social, idx) => (
                <button key={idx} className="flex items-center justify-center p-3 border border-zinc-800 rounded-sm hover:bg-zinc-900 hover:border-zinc-700 transition-all group">
                  {social.isIconComponent ? (
                    <div className="text-white group-hover:scale-110 transition-transform">
                      <Twitter size={18} fill="white" />
                    </div>
                  ) : (
                    <img src={social.icon} className={`w-5 h-5 group-hover:scale-110 transition-transform ${social.invert ? 'invert' : ''}`} alt={social.name} />
                  )}
                </button>
              ))}
            </div>
            
            <p className="text-center text-xs text-zinc-500 pt-2">
              {isLoginMode ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
              <span 
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="text-[#95c0a4] font-bold cursor-pointer hover:underline transition-all"
              >
                {isLoginMode ? 'Đăng ký ngay' : 'Đăng nhập'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
