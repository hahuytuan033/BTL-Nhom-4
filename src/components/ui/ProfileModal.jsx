import { X, LogOut, Package, ShoppingCart, User as UserIcon } from 'lucide-react';

const ProfileModal = ({ isOpen, onClose, user, onLogout }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-all duration-300">
      <div className="relative bg-[#0a0a0a] w-full max-w-md rounded-sm border border-zinc-800 animate-in fade-in zoom-in duration-300 shadow-2xl shadow-[#95c0a4]/5 p-8">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-[#95c0a4] hover:text-black rounded-full text-white transition-all duration-300"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center space-y-4 mb-8">
          <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center border-2 border-[#95c0a4] text-[#95c0a4]">
            <UserIcon size={48} />
          </div>
          <div className="text-center">
            <h2 className="text-white text-2xl font-black uppercase tracking-tight">{user.fullName}</h2>
            <p className="text-zinc-400 text-sm">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-zinc-900/50 p-4 rounded-sm border border-zinc-800 flex flex-col items-center justify-center space-y-2">
            <Package className="text-[#95c0a4]" size={24} />
            <span className="text-3xl font-black text-white">0</span>
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Đơn hàng</span>
          </div>
          <div className="bg-zinc-900/50 p-4 rounded-sm border border-zinc-800 flex flex-col items-center justify-center space-y-2">
            <ShoppingCart className="text-[#95c0a4]" size={24} />
            <span className="text-3xl font-black text-white">2</span>
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Giỏ hàng</span>
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="w-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white font-black py-4 rounded-sm transition-all duration-300 uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-2"
        >
          <LogOut size={16} />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;