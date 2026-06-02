import { useState, useEffect } from 'react';
import { X, CheckCircle2, CreditCard, ShieldCheck, MapPin, Phone, User, ShoppingBag } from 'lucide-react';

const CheckoutModal = ({ isOpen, onClose, items = [], user, onCheckoutSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    customer: user?.fullName || '',
    phone: '',
    address: '',
    paymentMethod: 'COD'
  });

  // Reset form and state when modal opens with new items
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setError('');
      setFormData({
        customer: user?.fullName || '',
        phone: '',
        address: '',
        paymentMethod: 'COD'
      });
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const calculateSubtotal = () => {
    return items.reduce((acc, item) => {
      const priceNum = item.product.price ? parseInt(item.product.price.toString().replace(/\./g, '')) : 0;
      return acc + (priceNum * item.quantity);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const subtotal = calculateSubtotal();

    if (!formData.customer.trim()) {
      setError('Vui lòng nhập tên người nhận.');
      setLoading(false);
      return;
    }
    if (!formData.phone.trim()) {
      setError('Vui lòng nhập số điện thoại.');
      setLoading(false);
      return;
    }
    if (!formData.address.trim()) {
      setError('Vui lòng nhập địa chỉ giao hàng.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData.customer,
          userEmail: user?.email || 'guest@example.com',
          phone: formData.phone,
          address: formData.address,
          amount: subtotal,
          items: items.reduce((acc, item) => acc + item.quantity, 0)
        })
      });

      const data = await response.json();

      if (response.ok) {
        setOrderInfo(data);
        setIsSuccess(true);
        // Trigger callback to clean the cart
        if (onCheckoutSuccess) {
          const itemIds = items.map(item => item.id);
          onCheckoutSuccess(itemIds);
        }
      } else {
        setError(data.message || 'Có lỗi xảy ra khi tạo đơn hàng');
      }
    } catch (err) {
      console.error(err);
      setError('Không thể kết nối đến server để thực hiện thanh toán.');
    } finally {
      setLoading(false);
    }
  };

  const subtotal = calculateSubtotal();

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md transition-all duration-300">
      <div className="relative bg-[#0a0a0a] w-full max-w-4xl min-h-[500px] flex flex-col md:flex-row overflow-hidden rounded-sm border border-zinc-800 animate-in fade-in zoom-in duration-500 shadow-2xl shadow-[#95c0a4]/5">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-[#95c0a4] hover:text-black rounded-full text-white transition-all duration-300"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          // SUCCESS PANEL
          <div className="w-full p-8 md:p-16 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500 bg-black">
            <div className="flex justify-center">
              <CheckCircle2 size={80} className="text-[#95c0a4] animate-bounce" />
            </div>
            <div className="space-y-2 max-w-lg">
              <h2 className="text-white text-3xl font-black uppercase italic tracking-tight">ĐẶT HÀNG THÀNH CÔNG!</h2>
              <p className="text-zinc-400 text-sm">
                Cảm ơn quý khách đã mua sắm tại BTL-N4. Mã đơn hàng của bạn là <strong className="text-[#95c0a4] font-mono">{orderInfo?.orderNumber}</strong>.
              </p>
            </div>
            <div className="w-full max-w-md bg-zinc-900/60 border border-zinc-800 p-6 rounded-lg text-left text-xs space-y-3">
              <h4 className="font-bold text-white uppercase border-b border-zinc-800 pb-2 text-[10px] tracking-widest text-[#95c0a4]">Thông Tin Người Nhận</h4>
              <p className="text-zinc-300 flex items-center gap-2"><User size={12} className="text-zinc-500" /> <span>Họ tên: <strong>{orderInfo?.customer}</strong></span></p>
              <p className="text-zinc-300 flex items-center gap-2"><Phone size={12} className="text-zinc-500" /> <span>Số điện thoại: <strong>{orderInfo?.phone}</strong></span></p>
              <p className="text-zinc-300 flex items-center gap-2"><MapPin size={12} className="text-zinc-500" /> <span>Địa chỉ: <strong>{orderInfo?.address}</strong></span></p>
              <p className="text-zinc-300 flex items-center gap-2"><CreditCard size={12} className="text-zinc-500" /> <span>Thanh toán: <strong>{formData.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản ngân hàng'}</strong></span></p>
              <div className="pt-2 border-t border-zinc-800 flex justify-between font-bold text-white">
                <span>Tổng số tiền:</span>
                <span className="text-[#95c0a4] text-sm">₫{orderInfo?.amount?.toLocaleString('vi-VN')}</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="px-10 py-4 bg-[#95c0a4] hover:bg-white text-black font-black transition-all duration-300 uppercase text-xs tracking-[0.2em] rounded-sm shadow-xl"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          // CHECKOUT FLOW
          <>
            {/* LEFT COLUMN: FORM DETAILS */}
            <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col justify-center bg-black overflow-y-auto max-h-[70vh] md:max-h-none border-b md:border-b-0 md:border-r border-zinc-800">
              <div className="max-w-md w-full mx-auto space-y-6">
                <div>
                  <h2 className="text-[#fafafa] text-2xl font-black tracking-tight uppercase italic flex items-center gap-2">
                    <MapPin className="text-[#95c0a4]" size={22} /> Thông tin giao hàng
                  </h2>
                  <p className="text-zinc-400 text-xs mt-1">Vui lòng cung cấp chính xác thông tin để đơn hàng được giao nhanh nhất.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs p-3 rounded-sm">
                      {error}
                    </div>
                  )}

                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest flex items-center gap-1.5">
                      <User size={10} /> Tên người nhận <span className="text-red-500">*</span>
                    </label>
                    <input 
                      name="customer"
                      type="text" 
                      required
                      value={formData.customer}
                      onChange={handleInputChange}
                      placeholder="Ví dụ: Nguyễn Văn A" 
                      className="w-full bg-[#121212] border border-zinc-800 rounded-sm py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#95c0a4] transition-all"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest flex items-center gap-1.5">
                      <Phone size={10} /> Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input 
                      name="phone"
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Ví dụ: 0987654321" 
                      className="w-full bg-[#121212] border border-zinc-800 rounded-sm py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#95c0a4] transition-all"
                    />
                  </div>

                  {/* Address field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest flex items-center gap-1.5">
                      <MapPin size={10} /> Địa chỉ giao hàng <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      name="address"
                      required
                      rows="3"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Địa chỉ số nhà, ngõ/ngách, phường/xã, quận/huyện, thành phố..." 
                      className="w-full bg-[#121212] border border-zinc-800 rounded-sm py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#95c0a4] transition-all resize-none"
                    />
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest flex items-center gap-1.5 mb-1">
                      <CreditCard size={10} /> Phương thức thanh toán
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className={`flex items-center justify-between p-3 border rounded-sm cursor-pointer transition-all ${formData.paymentMethod === 'COD' ? 'border-[#95c0a4] bg-[#95c0a4]/5 text-white' : 'border-zinc-800 text-zinc-500'}`}>
                        <span className="text-xs font-bold">Thanh toán khi nhận (COD)</span>
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value="COD"
                          checked={formData.paymentMethod === 'COD'}
                          onChange={handleInputChange}
                          className="accent-[#95c0a4]"
                        />
                      </label>
                      <label className={`flex items-center justify-between p-3 border rounded-sm cursor-pointer transition-all ${formData.paymentMethod === 'BANK' ? 'border-[#95c0a4] bg-[#95c0a4]/5 text-white' : 'border-zinc-800 text-zinc-500'}`}>
                        <span className="text-xs font-bold">Chuyển khoản</span>
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value="BANK"
                          checked={formData.paymentMethod === 'BANK'}
                          onChange={handleInputChange}
                          className="accent-[#95c0a4]"
                        />
                      </label>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={loading || items.length === 0}
                    className="w-full bg-[#95c0a4] hover:bg-white text-black font-black py-4 rounded-sm transition-all duration-300 uppercase text-xs tracking-[0.2em] disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
                  >
                    {loading ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN ĐẶT HÀNG'}
                  </button>
                </form>
              </div>
            </div>

            {/* RIGHT COLUMN: ITEMS SUMMARY */}
            <div className="w-full md:w-5/12 p-6 md:p-8 bg-[#121214]/60 flex flex-col justify-between overflow-y-auto max-h-[40vh] md:max-h-none">
              <div className="space-y-6 flex-1">
                <h3 className="text-[#fafafa] text-lg font-black tracking-tight uppercase italic border-b border-zinc-800 pb-3 flex items-center gap-2">
                  <ShoppingBag className="text-[#95c0a4]" size={18} /> Tóm tắt đơn hàng ({items.reduce((acc, item) => acc + item.quantity, 0)})
                </h3>
                
                {/* List items */}
                <div className="space-y-3 overflow-y-auto max-h-[220px] md:max-h-[350px] pr-2">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3 items-center py-2 border-b border-zinc-900/50">
                      <div className="w-12 h-12 bg-zinc-950 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-1 border border-zinc-800">
                        <img src={item.product.image} className="w-full h-full object-contain" alt={item.product.title} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-xs text-white truncate">{item.product.title}</h4>
                        <p className="text-[9px] text-zinc-500 mt-0.5">Size: {item.size} • Số lượng: {item.quantity}</p>
                      </div>
                      <span className="text-xs font-bold text-zinc-300">
                        ₫{item.product.price ? (parseFloat(item.product.price.toString().replace(/\./g, '')) * item.quantity).toLocaleString('vi-VN') : '0'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total calculations */}
              <div className="pt-6 border-t border-zinc-800 space-y-3 mt-6">
                <div className="flex justify-between items-center text-xs text-zinc-400">
                  <span>Tạm tính:</span>
                  <span>₫{subtotal.toLocaleString('vi-VN')}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-zinc-400">
                  <span>Vận chuyển:</span>
                  <span className="text-[#95c0a4] font-bold">MIỄN PHÍ</span>
                </div>
                <div className="flex justify-between items-center font-bold text-white border-t border-zinc-900 pt-3">
                  <span className="text-sm">Tổng cộng thanh toán:</span>
                  <span className="text-lg text-[#95c0a4]">₫{subtotal.toLocaleString('vi-VN')}</span>
                </div>
                <div className="pt-3 flex items-center gap-2 bg-[#95c0a4]/5 p-3 rounded border border-[#95c0a4]/10 text-[10px] text-zinc-400">
                  <ShieldCheck className="text-[#95c0a4] flex-shrink-0" size={16} />
                  <span>Cam kết chính hãng 100%. Bảo hiểm giao dịch toàn diện bởi BTL-N4 Ecosystem.</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
