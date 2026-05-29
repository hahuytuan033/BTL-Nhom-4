import { useMemo } from 'react';

export default function Checkout() {
  const cart = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch {
      return [];
    }
  }, []);

  const subtotal = cart.reduce((sum, it) => sum + (Number(it.price) || 0) * (Number(it.qty) || 1), 0);

  const handlePay = () => {
    // Placeholder thanh toán - bạn có thể đổi sang route thanh toán thực tế (VNPay/Stripe/etc.)
    alert('Chuyển sang trang thanh toán (demo).');
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#fafafa] font-sans pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 md:px-10">
        <h1 className="text-3xl font-black tracking-tight">Thanh toán</h1>
        <p className="text-zinc-500 text-sm mt-2">Kiểm tra giỏ hàng của bạn trước khi thanh toán.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#121212] border border-zinc-800 rounded-sm p-4">
              <h2 className="text-[#95c0a4] text-[10px] uppercase tracking-[0.2em] font-black">Hàng của bạn</h2>
              <div className="h-[1px] bg-zinc-800 my-4" />

              {cart.length === 0 ? (
                <div className="text-zinc-400 text-sm">Giỏ hàng đang trống.</div>
              ) : (
                <div className="space-y-4">
                  {cart.map((it) => (
                    <div key={String(it.id)} className="flex items-center gap-4 border border-zinc-800 rounded-sm p-3">
                      <img
                        src={it.image}
                        alt={it.title}
                        className="w-16 h-16 object-contain bg-zinc-900 rounded-sm"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/120?text=Sneaker';
                        }}
                      />
                      <div className="flex-1">
                        <div className="font-bold text-sm">{it.title}</div>
                        <div className="text-zinc-500 text-xs">{it.brand}</div>
                        <div className="text-zinc-300 text-sm mt-1">
                          <div>
                            {new Intl.NumberFormat('vi-VN').format(Number(it.price) || 0)} x {it.qty}
                          </div>
                          <div className="text-zinc-500 text-xs mt-1">
                            Size: <span className="text-[#fafafa] font-bold">{it.size || '42'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-black">
                          {new Intl.NumberFormat('vi-VN').format((Number(it.price) || 0) * (Number(it.qty) || 1))}
                        </div>
                        <div className="text-zinc-500 text-xs">VND</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-[#121212] border border-zinc-800 rounded-sm p-4">
              <h2 className="text-[#95c0a4] text-[10px] uppercase tracking-[0.2em] font-black">Thông tin nhận hàng</h2>
              <div className="h-[1px] bg-zinc-800 my-4" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-1">Họ tên</label>
                  <input
                    className="w-full bg-[#0f0f0f] border border-zinc-700 text-zinc-200 rounded-sm px-3 py-2 text-sm"
                    defaultValue=""
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-1">Số điện thoại</label>
                  <input
                    className="w-full bg-[#0f0f0f] border border-zinc-700 text-zinc-200 rounded-sm px-3 py-2 text-sm"
                    defaultValue=""
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-1">Email</label>
                  <input
                    className="w-full bg-[#0f0f0f] border border-zinc-700 text-zinc-200 rounded-sm px-3 py-2 text-sm"
                    defaultValue=""
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-1">Quốc gia</label>
                  <select className="w-full bg-[#0f0f0f] border border-zinc-700 text-zinc-200 rounded-sm px-3 py-2 text-sm" defaultValue="VN">
                    <option value="VN">Việt Nam</option>
                    <option value="US">United States</option>
                    <option value="JP">Japan</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-1">Địa chỉ</label>
                  <input
                    className="w-full bg-[#0f0f0f] border border-zinc-700 text-zinc-200 rounded-sm px-3 py-2 text-sm"
                    defaultValue=""
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-1">Tỉnh/Thành phố</label>
                  <input
                    className="w-full bg-[#0f0f0f] border border-zinc-700 text-zinc-200 rounded-sm px-3 py-2 text-sm"
                    defaultValue=""
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#121212] border border-zinc-800 rounded-sm p-4">
              <h2 className="text-[#95c0a4] text-[10px] uppercase tracking-[0.2em] font-black">Phương thức thanh toán</h2>
              <div className="h-[1px] bg-zinc-800 my-4" />

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-zinc-800 rounded-sm cursor-pointer hover:border-[#95c0a4]/40">
                  <input type="radio" name="pay-method" defaultChecked />
                  <span className="text-sm">Thanh toán khi nhận hàng (COD)</span>
                </label>

                <label className="flex items-center gap-3 p-3 border border-zinc-800 rounded-sm cursor-pointer hover:border-[#95c0a4]/40">
                  <input type="radio" name="pay-method" />
                  <span className="text-sm">Chuyển khoản ngân hàng</span>
                </label>

                <div className="text-zinc-500 text-xs">
                  * Demo UI. Bạn có thể thay bằng tích hợp cổng thanh toán thật.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#121212] border border-zinc-800 rounded-sm p-4 h-fit">
            <h2 className="text-[#95c0a4] text-[10px] uppercase tracking-[0.2em] font-black">Tóm tắt đơn</h2>
            <div className="h-[1px] bg-zinc-800 my-4" />

            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">Tổng cộng</span>
              <span className="font-black">
                {new Intl.NumberFormat('vi-VN').format(subtotal)}
              </span>
            </div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mt-1">VND</div>

            <button
              onClick={handlePay}
              disabled={cart.length === 0}
              className="mt-6 w-full bg-[#95c0a4] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white text-black font-black py-3 rounded-sm transition-all uppercase text-xs tracking-[0.2em]"
            >
              Xác nhận thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

