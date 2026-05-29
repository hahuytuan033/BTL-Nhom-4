import { useMemo } from 'react';

export default function Cart() {
  const cart = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch {
      return [];
    }
  }, []);

  const subtotal = cart.reduce((sum, it) => sum + (Number(it.price) || 0) * (Number(it.qty) || 1), 0);

  const SIZE_LIST = ['39','40','41','42','43','44'];

  const updateQty = (id, nextQty) => {
    const current = JSON.parse(localStorage.getItem('cart') || '[]');
    const qty = Math.max(1, Number(nextQty) || 1);
    const next = current.map((it) => (String(it.id) === String(id) ? { ...it, qty } : it));
    localStorage.setItem('cart', JSON.stringify(next));
    window.location.reload();
  };

  const updateSize = (id, nextSize) => {
    const current = JSON.parse(localStorage.getItem('cart') || '[]');
    const size = nextSize || '42';
    const next = current.map((it) =>
      String(it.id) === String(id)
        ? { ...it, size }
        : it
    );
    localStorage.setItem('cart', JSON.stringify(next));
    window.location.reload();
  };

  const removeItem = (id) => {
    const current = JSON.parse(localStorage.getItem('cart') || '[]');
    const next = current.filter((it) => String(it.id) !== String(id));
    localStorage.setItem('cart', JSON.stringify(next));
    window.location.reload();
  };

  const goCheckout = () => {
    window.location.href = '/checkout';
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#fafafa] font-sans pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 md:px-10">
        <h1 className="text-3xl font-black tracking-tight">Giỏ hàng</h1>
        <p className="text-zinc-500 text-sm mt-2">Thêm sản phẩm từ trang chủ để thanh toán.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-[#121212] border border-zinc-800 rounded-sm p-4">
            {cart.length === 0 ? (
              <div className="text-zinc-400 text-sm">Giỏ hàng trống.</div>
            ) : (
              <div className="space-y-4">
                {cart.map((it) => (
                  <div key={it.id} className="flex items-center gap-4 border border-zinc-800 rounded-sm p-3">
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
                        {new Intl.NumberFormat('vi-VN').format((Number(it.price) || 0) * (Number(it.qty) || 1))} VND
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1">
                          <label className="block text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-1">
                            Size
                          </label>
                          <select
                            className="w-full bg-[#0f0f0f] border border-zinc-700 text-zinc-200 rounded-sm px-2 py-1 text-sm"
                            value={it.size || '42'}
                            onChange={(e) => updateSize(it.id, e.target.value)}
                          >
                            {SIZE_LIST.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          <button
                            className="px-2 py-1 rounded-sm border border-zinc-700 text-zinc-300 hover:text-white"
                            onClick={() => updateQty(it.id, (Number(it.qty) || 1) - 1)}
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-sm">{it.qty}</span>
                          <button
                            className="px-2 py-1 rounded-sm border border-zinc-700 text-zinc-300 hover:text-white"
                            onClick={() => updateQty(it.id, (Number(it.qty) || 1) + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => removeItem(it.id)}
                        className="text-xs text-red-500 hover:text-red-400 font-bold"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[#121212] border border-zinc-800 rounded-sm p-4 h-fit">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">Tổng cộng</span>
              <span className="font-black">{new Intl.NumberFormat('vi-VN').format(subtotal)}</span>
            </div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mt-1">VND</div>

            <button
              onClick={goCheckout}
              disabled={cart.length === 0}
              className="mt-6 w-full bg-[#95c0a4] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white text-black font-black py-3 rounded-sm transition-all uppercase text-xs tracking-[0.2em]"
            >
              Đi đến thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

