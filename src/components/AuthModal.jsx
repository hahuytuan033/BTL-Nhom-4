import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, Share2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate system checking account validity (Flowchart logic)
    setTimeout(() => {
      // Mock validation logic
      if (email && password.length >= 6) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 2000);
      } else {
        setError('Sai tài khoản hoặc mật khẩu (Invalid credentials)');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Success Overlay */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-emerald-500 flex flex-col items-center justify-center text-black p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-black text-emerald-500 rounded-full flex items-center justify-center mb-6"
                  >
                    <ArrowRight className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Đăng nhập thành công</h3>
                  <p className="font-bold uppercase tracking-widest text-xs opacity-80">Access Granted. Redirecting to Terminal...</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-8">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors"
                id="close-auth-modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-10">
                <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">
                  {mode === 'login' ? 'Authentication' : 'Registration'}
                </h2>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]">
                  {mode === 'login' ? 'Secure Login Hub' : 'Join the Global Network'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {mode === 'signup' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="ENTER NAME"
                        className="w-full bg-black border border-zinc-800 rounded px-10 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors uppercase font-bold"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="USER@NETWORK.COM"
                      className="w-full bg-black border border-zinc-800 rounded px-10 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors font-bold"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Access Key</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-black border border-zinc-800 rounded px-10 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors font-bold"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-[10px] font-black uppercase tracking-widest bg-red-500/10 p-3 rounded border border-red-500/20"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-black py-4 font-black uppercase tracking-widest text-sm rounded shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                  id="auth-submit-btn"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      {mode === 'login' ? 'Đăng nhập' : 'Create Account'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-zinc-800">
                <p className="text-center text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-6">Social Handshake</p>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 py-3 border border-zinc-800 rounded hover:bg-zinc-800 transition-colors text-[10px] font-bold uppercase tracking-widest">
                    <Share2 className="w-4 h-4" /> Google
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 border border-zinc-800 rounded hover:bg-zinc-800 transition-colors text-[10px] font-bold uppercase tracking-widest">
                    <Share2 className="w-4 h-4" /> Github
                  </button>
                </div>
              </div>

              <div className="mt-8 text-center text-xs font-bold uppercase tracking-widest">
                <span className="text-zinc-500">{mode === 'login' ? 'New to the network?' : 'Existing Member?'}</span>
                <button 
                  type="button"
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="ml-2 text-white hover:text-emerald-500 transition-colors"
                >
                  {mode === 'login' ? 'Sign Up' : 'Log In'}
                </button>
              </div>
            </div>
            
            <div className={`h-1 w-full bg-emerald-500 transition-all duration-300 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
              <motion.div 
                animate={{ x: ['-100%', '100%'] }} 
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-1/3 h-full bg-white shadow-[0_0_15px_white]"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
