import { useEffect, useMemo, useState } from 'react';

const SIZE_LIST = ['39', '40', '41', '42', '43', '44'];

function normalizePrice(p) {
  if (typeof p === 'number') return p;
  return Number(String(p).replace(/[^0-9.]/g, '')) || 0;
}

export default function ProductQuickViewModal({ isOpen, onClose, product, onAddToCart, onBuyNow }) {
  const [size, setSize] = useState('42');

  useEffect(() => {
    if (isOpen) setSize('42');
  }, [isOpen, product?.id]);

  const priceNumber = useMemo(() => normalizePrice(product?.price), [product?.price]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-3xl bg-[#0a0a0a] border border-zinc-800 rounded-sm overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <div>
            <div className="text-[#95c0a4] text-[10px] uppercase tracking-[0.2em] font-black">SNEAKER DETAIL</div>
            <div className="text-white font-black text-lg line-clamp-1">{product.brand}</div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-sm hover:bg-zinc-900 text-white/90 hover:text-white transition-colors"
            aria-label="Đóng"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-zinc-950 p-6 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[420px] w-full object-contain"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/600?text=Sneaker';
              }}
            />
          </div>

          <div className="p-6">
            <h2 className="text-white text-2xl font-black leading-tight">{product.title}</h2>

            <div className="mt-3 flex items-center gap-2">
              <div className="bg-zinc-800/70 px-3 py-1 rounded text-xs text-[#cfcfcf] flex items-center gap-2">
                <span className="text-[#95c0a4] font-black">★</span>
                <span>{product.soldCount || '—'} lượt bán</span>
              </div>
            </div>

            <div className="mt-5">
              <div className="text-zinc-500 text-xs uppercase tracking-[0.2em]">Giá</div>
              <div className="text-white text-3xl font-black">₫{product.price}</div>
            </div>

            <div className="mt-5">
              <label className="block text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-2">Chọn size</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full bg-[#0f0f0f] border border-zinc-700 text-zinc-200 rounded-sm px-3 py-2 text-sm"
              >
                {SIZE_LIST.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onAddToCart?.(product, size)}
                className="flex-1 bg-zinc-900 hover:bg-white/10 border border-zinc-700 text-white font-black py-3 rounded-sm transition-all uppercase text-xs tracking-[0.2em]"
              >
                Thêm vào giỏ
              </button>

              <button
                onClick={() => onBuyNow?.(product, size)}
                className="flex-1 bg-[#95c0a4] hover:bg-white text-black font-black py-3 rounded-sm transition-all uppercase text-xs tracking-[0.2em]"
              >
                Mua ngay
              </button>
            </div>

            <div className="mt-4 text-zinc-500 text-xs">
              * Demo UI. Không có barcode/giảm giá như mô tả.
            </div>

            <div className="mt-6 p-3 bg-zinc-900/40 border border-zinc-800 rounded-sm">
              <div className="text-zinc-500 text-[10px] uppercase tracking-[0.2em]">Tóm tắt</div>
              <div className="text-zinc-200 text-sm mt-2">
                Size: <span className="font-black text-white">{size}</span>
                <span className="text-zinc-500"> • </span>
                Thành tiền: <span className="font-black text-white">₫{new Intl.NumberFormat('vi-VN').format(priceNumber)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

