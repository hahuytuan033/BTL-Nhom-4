import { useState } from 'react';
import { X, Twitter, CheckCircle2 } from 'lucide-react';

const socialLogins = [
  { name: 'Google', icon: 'https://www.svgrepo.com/show/475656/google-color.svg' },
  { name: 'Facebook', icon: 'https://www.svgrepo.com/show/475647/facebook-color.svg' },
  { name: 'Apple', icon: 'https://www.svgrepo.com/show/303108/apple-black-logo.svg', invert: true },
  { name: 'Twitter', isIconComponent: true }
];

const LoginModal = ({ isOpen, onClose, setUser }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!isLoginMode && !formData.email.toLowerCase().endsWith('@gmail.com')) {
      setError('Vui lòng sử dụng tài khoản Gmail (@gmail.com)');
      setLoading(false);
      return;
    }

    if (!isLoginMode && formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      setLoading(false);
      return;
    }

    const endpoint = isLoginMode ? '/api/users/login' : '/api/users/register';
    const payload = isLoginMode 
      ? { email: formData.email, password: formData.password }
      : { fullName: formData.fullName, email: formData.email, password: formData.password };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (!isLoginMode) {
          setIsSuccess(true);
        } else {
          // Lưu token và thông tin user
          localStorage.setItem('userToken', data.token);
          localStorage.setItem('user', JSON.stringify(data));
          if (setUser) setUser(data);
          alert('Đăng nhập thành công!');
          onClose();
        }
      } else {
        setError(data.message || 'Có lỗi xảy ra');
      }
    } catch (err) {
      setError('Không thể kết nối đến server');
    } finally {
      setLoading(false);
    }
  };

  const resetAndSwitch = () => {
    setIsSuccess(false);
    setIsLoginMode(true);
    setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-all duration-300">
      <div className="relative bg-[#0a0a0a] w-full max-w-4xl min-h-[600px] flex flex-col md:flex-row overflow-hidden rounded-sm border border-zinc-800 animate-in fade-in zoom-in duration-500 shadow-2xl shadow-[#95c0a4]/5">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-[#95c0a4] hover:text-black rounded-full text-white transition-all duration-300"
        >
          <X size={20} />
        </button>

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
            <p className="text-zinc-400 text-sm">Trở thành thành viên của Nhóm 4 để nhận ưu đãi độc quyền.</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 lg:p-12 bg-black overflow-y-auto max-h-[90vh] md:max-h-none">
          <div className="max-w-md w-full mx-auto space-y-6 my-auto">
            {isSuccess ? (
              <div className="text-center space-y-6 animate-in zoom-in duration-500">
                <div className="flex justify-center">
                  <CheckCircle2 size={80} className="text-[#95c0a4]" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-white text-2xl font-black uppercase italic">Đăng ký thành công!</h2>
                  <p className="text-zinc-400">Chào mừng bạn gia nhập gia đình BTL-N4. Bây giờ bạn có thể đăng nhập bằng tài khoản vừa tạo.</p>
                </div>
                <button 
                  onClick={resetAndSwitch}
                  className="w-full bg-[#95c0a4] hover:bg-white text-black font-black py-4 rounded-sm transition-all duration-300 uppercase text-xs tracking-[0.2em]"
                >
                  Click để chuyển sang Đăng nhập
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <h2 className="text-[#fafafa] text-3xl font-black tracking-tight uppercase italic">
                    {isLoginMode ? 'Chào mừng trở lại' : 'Tạo tài khoản'}
                  </h2>
                  <p className="text-[#cfcfcf] text-sm">
                    {isLoginMode ? 'Nhập thông tin của bạn để tiếp tục.' : 'Điền thông tin bên dưới để đăng ký tài khoản mới.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs p-3 rounded-sm">
                      {error}
                    </div>
                  )}

                  {!isLoginMode && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Họ và tên</label>
                      <input 
                        name="fullName"
                        type="text" 
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Nguyễn Văn A" 
                        className="w-full bg-[#121212] border border-zinc-800 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-[#95c0a4] transition-all"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Địa chỉ Email</label>
                    <input 
                      name="email"
                      type="email" 
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com" 
                      className="w-full bg-[#121212] border border-zinc-800 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-[#95c0a4] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Mật khẩu</label>
                    <input 
                      name="password"
                      type="password" 
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••" 
                      className="w-full bg-[#121212] border border-zinc-800 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-[#95c0a4] transition-all"
                    />
                  </div>

                  {!isLoginMode && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Xác nhận Mật khẩu</label>
                      <input 
                        name="confirmPassword"
                        type="password" 
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="••••••••" 
                        className="w-full bg-[#121212] border border-zinc-800 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-[#95c0a4] transition-all"
                      />
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#95c0a4] hover:bg-white text-black font-black py-4 rounded-sm transition-all duration-300 uppercase text-xs tracking-[0.2em] disabled:opacity-50"
                  >
                    {loading ? 'ĐANG XỬ LÝ...' : (isLoginMode ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ TÀI KHOẢN')}
                  </button>
                </form>

                <div className="relative flex items-center pt-2">
                  <div className="flex-grow border-t border-zinc-800"></div>
                  <span className="flex-shrink mx-4 text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-bold">Hoặc</span>
                  <div className="flex-grow border-t border-zinc-800"></div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {socialLogins.map((social, idx) => (
                    <button key={idx} className="flex items-center justify-center p-3 border border-zinc-800 rounded-sm hover:bg-zinc-900 transition-all group">
                      {social.isIconComponent ? (
                        <div className="text-white">
                          <Twitter size={18} fill="white" />
                        </div>
                      ) : (
                        <img src={social.icon} className={`w-5 h-5 ${social.invert ? 'invert' : ''}`} alt={social.name} />
                      )}
                    </button>
                  ))}
                </div>
                
                <p className="text-center text-xs text-zinc-500 pt-2">
                  {isLoginMode ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
                  <span 
                    onClick={() => { setIsLoginMode(!isLoginMode); setError(''); }}
                    className="text-[#95c0a4] font-bold cursor-pointer hover:underline transition-all"
                  >
                    {isLoginMode ? 'Đăng ký ngay' : 'Đăng nhập'}
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
