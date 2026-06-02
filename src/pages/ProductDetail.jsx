import { useState, useEffect } from 'react';
import { 
  Star, ShieldCheck, Truck, RotateCcw, Minus, Plus, 
  ShoppingCart, Heart, Share2, X, Check, Copy, Info, 
  Eye, ShoppingBag, ArrowRight, Sparkles, MessageSquare 
} from 'lucide-react';

const mockReviews = [
  {
    id: 1,
    name: "Lê Minh Trí",
    rating: 5,
    date: "25/05/2026",
    content: "Giày đẹp xuất sắc ngoài mong đợi, da sờ rất mượt không bị nhăn nhiều khi gập chân. Check đúng hàng chuẩn chính hãng, bọc hộp siêu kỹ.",
    avatar: "T"
  },
  {
    id: 2,
    name: "Hoàng Yến Nhi",
    rating: 5,
    date: "14/05/2026",
    content: "Giao đúng mẫu chuẩn hình, gót giày cứng cáp đi tôn dáng cực kỳ. Shop tư vấn size rất nhiệt tình.",
    avatar: "N"
  }
];

export default function ProductDetail({ 
  product, 
  onBack, 
  cart = [], 
  onAddToCart, 
  onUpdateCartItemQuantity, 
  onRemoveFromCart,
  onOpenCheckout
}) {
  // App Interactions States - Move to TOP to avoid Rule of Hooks violation
  const [selectedSize, setSelectedSize] = useState('42'); 
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [reviewFilter, setReviewFilter] = useState('all');
  const [favorites, setFavorites] = useState(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());

  useEffect(() => {
    setSelectedItems(prev => {
      const next = new Set(prev);
      cart.forEach(item => {
        if (!prev.has(item.id)) {
          next.add(item.id);
        }
      });
      const cartIds = new Set(cart.map(c => c.id));
      for (const id of next) {
        if (!cartIds.has(id)) {
          next.delete(id);
        }
      }
      return next;
    });
  }, [cart]);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', transform: 'scale(1)' });
  
  const [vouchers, setVouchers] = useState([
    { code: 'BTLN4_SNEAKER50', desc: 'Giảm 50k cho đơn từ 1.5M', applied: false },
    { code: 'FREESHIP_MAX', desc: 'Miễn phí vận chuyển toàn quốc', applied: false }
  ]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Update selected size if needed once product is available
  useEffect(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[4] || product.sizes[0]);
    } else if (product) {
      // Fallback sizes if not provided in product prop
      setSelectedSize('42');
    }
  }, [product?.id]);

  useEffect(() => {
    if (product) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product?.id]);

  // Early return check AFTER ALL HOOKS
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#09090b] text-white font-sans">
        <div className="text-center p-8 bg-zinc-900 border border-zinc-800 rounded-2xl max-w-sm">
          <h2 className="text-2xl font-black mb-4 uppercase tracking-tighter italic text-[#95c0a4]">Sản phẩm không tồn tại</h2>
          <p className="text-zinc-400 text-sm mb-6">Có vẻ như sản phẩm bạn đang tìm kiếm đã bị gỡ bỏ hoặc link không chính xác.</p>
          <button 
            onClick={onBack} 
            className="w-full bg-[#95c0a4] text-black font-black py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-white transition-all shadow-lg"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  // Bổ sung dữ liệu phụ cho product truyền vào để render đầy đủ
  const rawPrice = product.price ? parseInt(product.price.toString().replace(/\./g, '')) : 0;
  
  const enhancedProduct = {
    ...product,
    rawPrice: rawPrice,
    rating: 4.8,
    color: product.color || 'Đen/Trắng', 
    sizes: product.sizes || ['38', '39', '40', '41', '42', '43', '44'],
    description: product.description || "Nike Dunk Low 'Panda' sở hữu phối màu tối giản nhưng mang tính biểu tượng mạnh mẽ. Được chế tác từ chất liệu da mềm thượng hạng mang lại sự êm ái tối đa.",
    specs: product.specs || {
      "Thương hiệu": product.brand || "N/A",
      "Dòng sản phẩm": "Giày Cao Cấp",
      "Mã SKU": "DD1391-100",
      "Màu sắc": product.color || "Đen/Trắng",
      "Chất liệu": "Da cao cấp",
      "Đế giày": "Cao su chống trượt",
      "Hộp đi kèm": "Hộp chính hãng"
    }
  };

  // Toast helper
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.8)'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none', transform: 'scale(1)' });
  };

  const handleAddToCart = () => {
    onAddToCart(enhancedProduct, enhancedProduct.color, selectedSize, quantity);
    showToast(`Đã thêm ${quantity}x ${enhancedProduct.title} vào giỏ hàng!`);
    setCartOpen(true);
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
        showToast("Đã xóa khỏi danh sách yêu thích", "info");
      } else {
        next.add(productId);
        showToast("Đã thêm vào mục yêu thích!", "success");
      }
      return next;
    });
  };

  const copyProductLink = () => {
    const tempInput = document.createElement("input");
    tempInput.value = window.location.href + `#product-${enhancedProduct.id}`;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    
    showToast("Đã sao chép liên kết sản phẩm!", "success");
    setShareOpen(false);
  };

  const toggleVoucher = (idx) => {
    setVouchers(prev => {
      const next = [...prev];
      next[idx].applied = !next[idx].applied;
      if (next[idx].applied) {
        showToast(`Đã áp dụng mã giảm giá: ${next[idx].code}`);
      } else {
        showToast(`Hủy áp dụng mã giảm giá: ${next[idx].code}`, "info");
      }
      return next;
    });
  };

  const filteredReviews = reviewFilter === 'all' 
    ? mockReviews 
    : mockReviews.filter(r => r.rating === parseInt(reviewFilter));

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalSelectedItems = cart.filter(item => selectedItems.has(item.id)).reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart
    .filter(item => selectedItems.has(item.id))
    .reduce((acc, item) => {
      const priceNum = item.product.price ? parseInt(item.product.price.toString().replace(/\./g, '')) : 0;
      return acc + (priceNum * item.quantity);
    }, 0);

  return (
    <div className="bg-[#09090b] text-zinc-100 min-h-screen font-sans selection:bg-[#95c0a4] selection:text-[#09090b] pb-24 lg:pb-12 pt-4">
      
      {/* ==========================================
          MAIN CONTENT - PRODUCT DETAIL
          ========================================== */}
      <main className="max-w-[1300px] mx-auto px-4 md:px-10 py-6">
        
        {/* 2-Column Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-16">
          
          {/* ==========================================
              CỘT TRÁI: 1 ẢNH DUY NHẤT (Được căn giữa hoàn hảo)
              ========================================== */}
          <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-24">
            
            {/* Khung trưng bày ảnh chất lượng cao dạng Minimalist */}
            <div className="relative aspect-square bg-[#121214]/60 rounded-2xl overflow-hidden border border-zinc-800/80 group flex items-center justify-center shadow-lg">
              
              <div 
                className="w-full h-full relative overflow-hidden flex items-center justify-center p-6 cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <img 
                  src={enhancedProduct.image} 
                  alt={enhancedProduct.title} 
                  className="w-full h-full object-contain max-h-[500px] transition-transform duration-200"
                  style={{ transform: zoomStyle.transform, transformOrigin: zoomStyle.transformOrigin }}
                />

                {/* Nhãn Tag Sang Trọng */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                  <span className="bg-red-500/95 text-white text-[10px] font-black tracking-widest px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1">
                    <Sparkles size={10} /> GIẢM 20%
                  </span>
                  <span className="bg-[#95c0a4] text-black text-[10px] font-black tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
                    KIỂM ĐỊNH CHÍNH HÃNG
                  </span>
                </div>
                
                {/* Hướng dẫn Zoom */}
                <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-sm text-[10px] px-3 py-1.5 rounded-full text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5">
                  <Eye size={12} /> Di chuột để phóng to chi tiết
                </div>
              </div>

            </div>
          </div>

          {/* ==========================================
              CỘT PHẢI: CHI TIẾT THÔNG TIN & CHỌN MUA (Đã lược bỏ màu sắc)
              ========================================== */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            
            {/* Nhãn thương hiệu & Badge yêu thích */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-black tracking-widest text-[#95c0a4] uppercase bg-[#95c0a4]/10 px-3.5 py-1 rounded-full border border-[#95c0a4]/20">
                {enhancedProduct.brand} CHÍNH HÃNG
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleFavorite(enhancedProduct.id)}
                  className="p-2.5 bg-[#121214] hover:bg-zinc-800 rounded-full border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all flex items-center justify-center shadow"
                  title="Thêm vào yêu thích"
                >
                  <Heart size={18} className={favorites.has(enhancedProduct.id) ? "fill-rose-500 text-rose-500 scale-110" : "transition-transform"} />
                </button>
                <button 
                  onClick={() => setShareOpen(true)}
                  className="p-2.5 bg-[#121214] hover:bg-zinc-800 rounded-full border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all flex items-center justify-center shadow"
                  title="Chia sẻ sản phẩm"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Tiêu đề & Thông tin cơ bản */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-2 text-white leading-tight">
                {enhancedProduct.title}
              </h1>
              
              {/* Đánh giá & Bán hàng */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mt-3 bg-zinc-900/40 p-2.5 rounded-xl border border-zinc-900/80 w-fit">
                <div className="flex items-center text-amber-400">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <span className="ml-1.5 text-zinc-200 font-bold">{enhancedProduct.rating}</span>
                </div>
                <div className="w-px h-3 bg-zinc-800"></div>
                <span className="text-zinc-300">
                  <strong className="text-white">{enhancedProduct.soldCount}</strong> Đã bán
                </span>
                <div className="w-px h-3 bg-zinc-800"></div>
                <span className="text-zinc-300 flex items-center gap-1">
                  <MessageSquare size={12} className="text-[#95c0a4]" /> 
                  <strong className="text-white">128</strong> Bình luận
                </span>
              </div>
            </div>

            {/* Bảng giá nâng cấp */}
            <div className="bg-[#121214] border border-zinc-800/80 p-5 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#95c0a4]/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex items-baseline gap-4">
                <span className="text-3xl lg:text-4xl font-black text-[#95c0a4] tracking-tight">
                  ₫{enhancedProduct.price}
                </span>
                <span className="text-zinc-500 line-through text-sm">
                  ₫{(enhancedProduct.rawPrice * 1.25).toLocaleString('vi-VN')}
                </span>
                <span className="bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  Tiết kiệm 20%
                </span>
              </div>

              {/* Tag khuyến mãi nổi bật */}
              <div className="mt-4 pt-4 border-t border-zinc-800/60 flex flex-wrap gap-2.5">
                {vouchers.map((v, idx) => (
                  <button 
                    key={v.code}
                    onClick={() => toggleVoucher(idx)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-all ${
                      v.applied 
                        ? 'bg-[#95c0a4]/10 text-[#95c0a4] border-[#95c0a4]' 
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <Check size={12} className={v.applied ? "opacity-100 scale-100" : "opacity-0 scale-50"} />
                    <span>MÃ: <strong className="text-white">{v.code}</strong> - {v.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* HIỂN THỊ THÔNG TIN MÀU SẮC ĐƠN NHẤT */}
            <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-850/80 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Phân Loại Màu Sắc</span>
                <span className="text-sm font-bold text-white mt-1">Độc Bản: <span className="text-[#95c0a4]">{enhancedProduct.color}</span></span>
              </div>
              <span className="text-xs bg-[#95c0a4]/10 text-[#95c0a4] px-2.5 py-1 rounded border border-[#95c0a4]/20 font-black">
                PHỐI MÀU TIÊU CHUẨN
              </span>
            </div>

            {/* CHỌN SIZE SẢN PHẨM */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Kích Thước (EU): <strong className="text-[#95c0a4]">{selectedSize}</strong>
                </span>
                <button 
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-xs text-[#95c0a4] hover:text-white underline flex items-center gap-1 transition-colors"
                >
                  <Info size={12} /> Hướng dẫn chọn size
                </button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {enhancedProduct.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-11 flex items-center justify-center text-xs font-black border rounded-xl transition-all ${
                      selectedSize === size 
                        ? 'border-[#95c0a4] text-[#95c0a4] bg-[#95c0a4]/5 scale-[1.05]' 
                        : 'border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white bg-zinc-900/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CHỌN SỐ LƯỢNG */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">Số lượng mua</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-zinc-800 rounded-lg bg-zinc-900/50 w-fit">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/40 rounded-l-lg transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 h-10 bg-transparent text-center font-bold text-white focus:outline-none text-sm"
                  />
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/40 rounded-r-lg transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <span className="text-xs text-zinc-500">
                  Còn lại <strong className="text-zinc-300">125</strong> sản phẩm tại kho
                </span>
              </div>
            </div>

            {/* HÀNH ĐỘNG THÊM VÀO GIỎ / MUA NGAY (DESKTOP) */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white border border-[#95c0a4] font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.01] transition-all text-xs uppercase tracking-widest"
              >
                <ShoppingCart size={16} /> Thêm vào giỏ
              </button>
              <button 
                onClick={() => {
                  handleAddToCart();
                  setCartOpen(true);
                }}
                className="flex-1 bg-[#95c0a4] text-black hover:bg-white font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.01] transition-all text-xs uppercase tracking-widest shadow-lg shadow-[#95c0a4]/10"
              >
                Mua ngay <ArrowRight size={16} />
              </button>
            </div>

            {/* CAM KẾT & TIỆN ÍCH DỊCH VỤ CHẤT LƯỢNG CAO */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-zinc-900 pt-6 mt-2">
              <div className="flex items-start gap-2.5 p-3 bg-zinc-900/30 rounded-lg border border-zinc-900/50">
                <Truck size={18} className="text-[#95c0a4] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-white">Freeship Toàn Quốc</h4>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Với đơn hàng thanh toán trên 2M.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 bg-zinc-900/30 rounded-lg border border-zinc-900/50">
                <RotateCcw size={18} className="text-[#95c0a4] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-white">7 Ngày Đổi Size</h4>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Hỗ trợ đổi tận nhà nhanh chóng.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 bg-zinc-900/30 rounded-lg border border-zinc-900/50">
                <ShieldCheck size={18} className="text-[#95c0a4] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-white">Chính Hãng 100%</h4>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Đã qua kiểm định BTL-N4.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* TABS CHI TIẾT SẢN PHẨM & ĐÁNH GIÁ */}
        <div className="mb-16 border-t border-zinc-900 pt-10">
          <div className="flex border-b border-zinc-850 justify-start space-x-6">
            <button 
              onClick={() => setActiveTab('description')}
              className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${
                activeTab === 'description' 
                  ? 'text-[#95c0a4]' 
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              Chi tiết sản phẩm
              {activeTab === 'description' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#95c0a4] rounded-full animate-pulse"></span>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${
                activeTab === 'reviews' 
                  ? 'text-[#95c0a4]' 
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              Đánh giá từ khách hàng ({mockReviews.length})
              {activeTab === 'reviews' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#95c0a4] rounded-full animate-pulse"></span>
              )}
            </button>
          </div>

          <div className="py-8">
            {activeTab === 'description' ? (
              // Tab Mô Tả
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 text-sm text-zinc-400 leading-relaxed">
                <div className="space-y-4">
                  <h3 className="text-white font-extrabold text-lg flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#95c0a4] rounded-full"></span> Thông số kỹ thuật
                  </h3>
                  <div className="bg-zinc-900/20 border border-zinc-900 rounded-xl overflow-hidden">
                    <table className="w-full text-xs">
                      <tbody>
                        {Object.entries(enhancedProduct.specs).map(([key, val], idx) => (
                          <tr key={key} className={`border-b border-zinc-900/60 ${idx % 2 === 0 ? 'bg-zinc-900/10' : ''}`}>
                            <td className="py-3.5 px-4 font-semibold text-zinc-500 w-1/3">{key}</td>
                            <td className="py-3.5 px-4 text-white font-medium">{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-extrabold text-lg flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#95c0a4] rounded-full"></span> Mô tả & Cảm hứng thiết kế
                  </h3>
                  <div className="bg-zinc-900/20 border border-zinc-900/50 p-5 rounded-xl space-y-4 text-zinc-300">
                    <p>
                      Được thiết kế nhằm tối ưu hóa sự thoải mái cho việc di chuyển hàng ngày, sản phẩm <strong className="text-white">{enhancedProduct.title}</strong> thể hiện sự tôn vinh đối với di sản thể thao và thời trang cao cấp.
                    </p>
                    <p>
                      {enhancedProduct.description}
                    </p>
                    <p className="text-xs text-[#95c0a4] italic flex items-center gap-1.5">
                      <Sparkles size={14} /> Mỗi sản phẩm đều đi kèm tem xác thực 3D chống hàng giả độc quyền của BTL-N4.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              // Tab Đánh Giá Khách Hàng (Reviews)
              <div className="space-y-8">
                {/* Panel Thống Kê Tổng Quan */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 bg-zinc-900/20 p-6 rounded-xl border border-zinc-900">
                  <div className="flex flex-col items-center justify-center w-full md:w-1/4 border-b md:border-b-0 md:border-r border-zinc-900 pb-6 md:pb-0 text-center">
                    <span className="text-5xl font-black text-[#95c0a4]">{enhancedProduct.rating}</span>
                    <div className="flex text-amber-400 my-2.5">
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                    </div>
                    <span className="text-xs text-zinc-500 font-medium">Dựa trên 128 lượt mua</span>
                  </div>

                  <div className="flex-1 space-y-2.5">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Lọc theo mức độ hài lòng:</span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { val: 'all', label: 'Tất cả bình luận' },
                        { val: '5', label: '★★★★★ 5 Sao (112)' },
                        { val: '4', label: '★★★★☆ 4 Sao (12)' },
                        { val: '3', label: '★★★☆☆ 3 Sao (4)' }
                      ].map(filter => (
                        <button 
                          key={filter.val}
                          onClick={() => setReviewFilter(filter.val)}
                          className={`px-3.5 py-2 text-xs font-bold rounded-lg border transition-all ${
                            reviewFilter === filter.val 
                              ? 'border-[#95c0a4] text-[#95c0a4] bg-[#95c0a4]/5' 
                              : 'border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white bg-zinc-900/40'
                          }`}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Danh sách bình luận đã lọc */}
                <div className="space-y-5">
                  {filteredReviews.length > 0 ? (
                    filteredReviews.map(review => (
                      <div key={review.id} className="bg-[#121214]/40 border border-zinc-900 p-5 rounded-xl space-y-3 hover:border-zinc-800 transition-colors">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#95c0a4]/10 border border-[#95c0a4]/20 flex items-center justify-center font-extrabold text-[#95c0a4] text-sm shadow">
                              {review.avatar}
                            </div>
                            <div>
                              <div className="font-extrabold text-sm text-white flex items-center gap-2">
                                {review.name}
                                <span className="flex items-center gap-0.5 text-[9px] font-black text-[#95c0a4] bg-[#95c0a4]/10 px-2 py-0.5 rounded-full uppercase border border-[#95c0a4]/10">
                                  <ShieldCheck size={10} /> Đã kiểm chứng
                                </span>
                              </div>
                              <div className="flex text-amber-400 mt-1">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                  <Star key={i} size={11} fill="currentColor" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-zinc-500 font-medium">{review.date}</span>
                        </div>

                        <div className="text-xs text-zinc-500">Màu sắc: <span className="text-[#95c0a4] font-semibold">{enhancedProduct.color}</span></div>
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">{review.content}</p>

                        {/* Phản hồi từ Quản trị viên */}
                        <div className="bg-zinc-950/60 p-4 rounded-lg border-l-2 border-[#95c0a4] text-xs space-y-1.5">
                          <div className="flex items-center gap-1.5 font-bold text-[#95c0a4]">
                            <Sparkles size={12} /> BTL-N4 Official Care
                          </div>
                          <p className="text-zinc-400">
                            Cảm ơn quý khách {review.name} đã tin chọn sản phẩm chất lượng tại BTL-N4. Chúc bạn có những chặng hành trình tuyệt đẹp cùng đôi giày mới nhé!
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-zinc-500 text-sm">
                      Không có bình luận nào khớp với số sao bạn lọc.
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      </main>

      {/* ==========================================
          DYNAMIC BOTTOM STICKY BAR FOR MOBILE
          ========================================== */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#09090b]/90 backdrop-blur-md border-t border-zinc-900 p-4 flex items-center justify-between lg:hidden shadow-2xl">
        <div className="flex flex-col">
          <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">Đang xem</span>
          <span className="text-xs font-black text-white truncate max-w-[160px]">{enhancedProduct.title}</span>
          <span className="text-xs font-black text-[#95c0a4] mt-0.5 font-sans">₫{enhancedProduct.price}</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleAddToCart}
            className="p-3 bg-zinc-900 border border-[#95c0a4] text-[#95c0a4] rounded-xl flex items-center justify-center hover:bg-zinc-800 transition-all"
            title="Thêm giỏ hàng"
          >
            <ShoppingCart size={16} />
          </button>
          <button 
            onClick={() => {
              handleAddToCart();
              setCartOpen(true);
            }}
            className="bg-[#95c0a4] text-black font-black text-xs px-4 py-3 rounded-xl hover:bg-white transition-all uppercase tracking-widest flex items-center gap-1"
          >
            Mua ngay <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* ==========================================
          DRAWER GIỎ HÀNG THÔNG MINH (Cart Sidebar)
          ========================================== */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setCartOpen(false)} />
          
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#121214] border-l border-zinc-800 text-white flex flex-col shadow-2xl">
              
              {/* Cart Header */}
              <div className="p-6 border-b border-zinc-850 flex items-center justify-between">
                <h2 className="text-lg font-black tracking-wider flex items-center gap-2">
                  <ShoppingBag className="text-[#95c0a4]" size={20} /> GIỎ HÀNG CỦA BẠN ({totalCartItems})
                </h2>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="p-1 bg-zinc-900 hover:bg-zinc-800 rounded-full border border-zinc-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Cart Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length > 0 ? (
                  <>
                    {/* Select All */}
                    <div className="flex items-center gap-3 pb-3 border-b border-zinc-850 mb-3 px-1">
                      <input 
                        type="checkbox" 
                        checked={cart.length > 0 && selectedItems.size === cart.length} 
                        onChange={() => {
                          const allSelected = cart.length > 0 && selectedItems.size === cart.length;
                          if (allSelected) {
                            setSelectedItems(new Set());
                          } else {
                            setSelectedItems(new Set(cart.map(item => item.id)));
                          }
                        }}
                        className="w-4 h-4 rounded border-zinc-800 bg-zinc-950 text-[#95c0a4] focus:ring-0 accent-[#95c0a4] cursor-pointer"
                      />
                      <span 
                        className="text-xs font-bold text-zinc-400 uppercase tracking-widest cursor-pointer select-none"
                        onClick={() => {
                          const allSelected = cart.length > 0 && selectedItems.size === cart.length;
                          if (allSelected) {
                            setSelectedItems(new Set());
                          } else {
                            setSelectedItems(new Set(cart.map(item => item.id)));
                          }
                        }}
                      >
                        Chọn tất cả ({cart.length})
                      </span>
                    </div>

                    {cart.map(item => {
                      const itemPrice = item.product.price ? parseInt(item.product.price.toString().replace(/\./g, '')) : 0;
                      return (
                        <div key={item.id} className="flex items-center gap-3 p-3 bg-zinc-900/40 rounded-xl border border-zinc-850 relative group">
                          <input 
                            type="checkbox" 
                            checked={selectedItems.has(item.id)} 
                            onChange={() => {
                              setSelectedItems(prev => {
                                const next = new Set(prev);
                                if (next.has(item.id)) {
                                  next.delete(item.id);
                                } else {
                                  next.add(item.id);
                                }
                                return next;
                              });
                            }}
                            className="w-4 h-4 rounded border-zinc-850 bg-zinc-950 text-[#95c0a4] focus:ring-0 accent-[#95c0a4] cursor-pointer"
                          />
                          <div className="w-20 h-20 bg-zinc-950 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                            <img src={item.product.image} className="w-full h-full object-contain" alt={item.product.title} />
                          </div>
                          
                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <h4 className="font-bold text-sm text-white truncate">{item.product.title}</h4>
                              <p className="text-[11px] text-zinc-500 mt-0.5">Màu: {item.color} • Size: {item.size}</p>
                            </div>
                            <div className="flex justify-between items-end mt-2">
                              <span className="text-xs text-[#95c0a4] font-black">₫{(itemPrice * item.quantity).toLocaleString('vi-VN')}</span>
                              
                              {/* Sửa số lượng nhanh */}
                              <div className="flex items-center border border-zinc-800 bg-zinc-950 rounded-md">
                                <button 
                                  onClick={() => {
                                    if (item.quantity === 1) {
                                      onRemoveFromCart(item.id);
                                    } else {
                                      onUpdateCartItemQuantity(item.id, item.quantity - 1);
                                    }
                                  }}
                                  className="px-2 py-1 text-zinc-500 hover:text-white transition-colors"
                                >
                                  <Minus size={11} />
                                </button>
                                <span className="text-xs px-2 font-black text-zinc-300">{item.quantity}</span>
                                <button 
                                  onClick={() => {
                                    onUpdateCartItemQuantity(item.id, item.quantity + 1);
                                  }}
                                  className="px-2 py-1 text-zinc-500 hover:text-white transition-colors"
                                >
                                  <Plus size={11} />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Nút Xoá */}
                          <button 
                            onClick={() => onRemoveFromCart(item.id)}
                            className="absolute top-2 right-2 p-1 text-zinc-500 hover:text-red-500 hover:bg-zinc-800 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Xoá sản phẩm này"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                    <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                      <ShoppingBag size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-300 text-sm">Giỏ hàng rỗng</h4>
                      <p className="text-xs text-zinc-500 mt-1 max-w-[200px] mx-auto">Vui lòng chọn kích thước và số lượng phù hợp để tiếp tục mua sắm.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              <div className="p-6 border-t border-zinc-850 space-y-4 bg-[#121214]">
                <div className="flex justify-between items-center text-xs text-zinc-400">
                  <span>Tổng tiền tạm tính ({totalSelectedItems} sản phẩm):</span>
                  <span className="text-lg font-black text-white">₫{cartSubtotal.toLocaleString('vi-VN')}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-[#95c0a4]">
                  <span>Vận chuyển toàn quốc:</span>
                  <span className="font-bold">MIỄN PHÍ</span>
                </div>
                <button 
                  onClick={() => {
                    const selected = cart.filter(item => selectedItems.has(item.id));
                    if (selected.length === 0) {
                      alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán!');
                      return;
                    }
                    setCartOpen(false);
                    onOpenCheckout(selected);
                  }}
                  className="w-full bg-[#95c0a4] hover:bg-white text-black font-black py-4 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  Tiến hành thanh toán <ArrowRight size={14} />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL HƯỚNG DẪN CHỌN SIZE SÀN (Size Guide)
          ========================================== */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSizeGuideOpen(false)} />
          <div className="bg-[#121214] border border-zinc-800 p-6 rounded-2xl w-full max-w-lg z-10 space-y-4 relative text-white">
            <button 
              onClick={() => setSizeGuideOpen(false)}
              className="absolute top-4 right-4 p-1 bg-zinc-900 rounded-full text-zinc-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
            <div>
              <h3 className="text-lg font-black tracking-wider text-[#95c0a4] uppercase">Bảng kích cỡ chuẩn EU / CM</h3>
              <p className="text-xs text-zinc-500 mt-1">Vui lòng đo chiều dài chân để chọn size vừa vặn nhất.</p>
            </div>
            
            <div className="overflow-x-auto rounded-xl border border-zinc-900">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-zinc-900 text-zinc-400 border-b border-zinc-800">
                    <th className="py-3 px-4 font-bold">KÍCH CỠ EU</th>
                    <th className="py-3 px-4 font-bold">CHIỀU DÀI CHÂN (CM)</th>
                    <th className="py-3 px-4 font-bold">KÍCH CỠ US</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/40">
                  {[
                    { eu: '38', cm: '23.5 - 24.0 cm', us: '6.0' },
                    { eu: '39', cm: '24.1 - 24.5 cm', us: '6.5' },
                    { eu: '40', cm: '24.6 - 25.0 cm', us: '7.5' },
                    { eu: '41', cm: '25.1 - 25.5 cm', us: '8.0' },
                    { eu: '42', cm: '25.6 - 26.0 cm', us: '9.0' },
                    { eu: '43', cm: '26.1 - 26.5 cm', us: '9.5' },
                    { eu: '44', cm: '26.6 - 27.0 cm', us: '10.5' }
                  ].map(row => (
                    <tr key={row.eu} className="hover:bg-zinc-900/20 text-zinc-300">
                      <td className="py-3 px-4 font-black text-white">{row.eu}</td>
                      <td className="py-3 px-4">{row.cm}</td>
                      <td className="py-3 px-4 font-medium text-zinc-500">{row.us}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button 
              onClick={() => setSizeGuideOpen(false)}
              className="w-full bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-white font-bold py-3 rounded-xl text-xs"
            >
              Đóng bảng quy đổi
            </button>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL CHIA SẺ SẢN PHẨM (Share Popup)
          ========================================== */}
      {shareOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShareOpen(false)} />
          <div className="bg-[#121214] border border-zinc-800 p-6 rounded-2xl w-full max-w-sm z-10 space-y-4 relative text-white">
            <button 
              onClick={() => setShareOpen(false)}
              className="absolute top-4 right-4 p-1 bg-zinc-900 rounded-full text-zinc-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
            <div>
              <h3 className="text-base font-black text-white">Chia sẻ mẫu sản phẩm</h3>
              <p className="text-xs text-zinc-500 mt-1">Gửi liên kết trực tiếp để giới thiệu sản phẩm này.</p>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-zinc-950 border border-zinc-900 rounded-xl text-xs">
              <span className="text-zinc-500 truncate select-all flex-1">
                {window.location.href}#product-{enhancedProduct.id}
              </span>
              <button 
                onClick={copyProductLink}
                className="p-2 bg-[#95c0a4] text-black rounded-lg hover:bg-white transition-all flex items-center gap-1 font-bold"
                title="Sao chép liên kết"
              >
                <Copy size={12} /> Sao chép
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          THÔNG BÁO TOAST THÔNG MINH (Toast Notification)
          ========================================== */}
      {toast.show && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#121214] border border-[#95c0a4] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <div className="w-5 h-5 rounded-full bg-[#95c0a4]/10 border border-[#95c0a4] flex items-center justify-center text-[#95c0a4]">
            <Check size={12} />
          </div>
          <span className="text-xs font-bold text-white tracking-wide">{toast.message}</span>
        </div>
      )}

    </div>
  );
}
