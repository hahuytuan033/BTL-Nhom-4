import React, { useState, useEffect } from 'react';
import { 
  User, 
  Package, 
  TrendingUp, 
  Heart, 
  CreditCard, 
  Settings, 
  LogOut, 
  X, 
  Check, 
  Search, 
  MapPin, 
  Shield, 
  Briefcase 
} from 'lucide-react';

const UserProfile = ({ isOpen, onClose, user, onLogout, initialTab = 'profile' }) => {
  // Trạng thái tab hiện tại
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Trạng thái hiển thị dropdown user ở header
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Dữ liệu cá nhân (Khởi tạo từ props user)
  const [profileData, setProfileData] = useState({
    name: user?.fullName || '',
    email: user?.email || '',
    username: user?.username || user?.email?.split('@')[0] || 'user',
    shoeSize: '',
    apparelSize: '',
    accountType: 'Cá nhân (Individual)'
  });

  // Dữ liệu từ database
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  // Fetch dữ liệu khi tab thay đổi hoặc khi component mở
  useEffect(() => {
    if (isOpen && user) {
      const fetchData = async () => {
        setLoadingData(true);
        try {
          // Fetch Orders
          const orderRes = await fetch(`http://localhost:5000/api/orders/myorders?email=${user.email}`);
          if (orderRes.ok) {
            const orderData = await orderRes.json();
            setOrders(orderData);
          }

          // Fetch Wishlist
          const wishRes = await fetch(`http://localhost:5000/api/users/wishlist?email=${user.email}`);
          if (wishRes.ok) {
            const wishData = await wishRes.json();
            setFavorites(wishData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoadingData(false);
        }
      };
      fetchData();
    }
  }, [isOpen, user, activeTab]);

  // Cập nhật profileData khi prop user thay đổi
  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        name: user.fullName,
        email: user.email,
        username: user.username || user.email.split('@')[0]
      }));
    }
  }, [user]);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Danh sách địa chỉ giao hàng
  const [addresses, setAddresses] = useState([]);
  
  // Trạng thái mở các Modal chỉnh sửa
  const [activeModal, setActiveModal] = useState(null); // 'profile' | 'address' | 'sizes' | 'account'

  // Form tạm thời cho modal
  const [tempProfile, setTempProfile] = useState({ ...profileData });
  const [tempAddress, setTempAddress] = useState({ name: '', phone: '', address: '', city: '' });
  const [tempSizes, setTempSizes] = useState({ shoeSize: '', apparelSize: '' });
  const [tempAccountType, setTempAccountType] = useState('');

  // Trạng thái thông báo toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  if (!isOpen) return null;

  // Đồng bộ dữ liệu tạm thời khi mở modal
  const openModal = (type) => {
    setActiveModal(type);
    if (type === 'profile') setTempProfile({ ...profileData });
    if (type === 'sizes') setTempSizes({ shoeSize: profileData.shoeSize, apparelSize: profileData.apparelSize });
    if (type === 'account') setTempAccountType(profileData.accountType);
    if (type === 'address') setTempAddress({ name: '', phone: '', address: '', city: '' });
  };

  // Lưu thông tin cá nhân
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileData({ ...profileData, ...tempProfile });
    setActiveModal(null);
    showToast('Cập nhật thông tin cá nhân thành công!');
  };

  // Lưu địa chỉ mới
  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!tempAddress.address || !tempAddress.name) {
      showToast('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    setAddresses([...addresses, tempAddress]);
    setActiveModal(null);
    showToast('Đã thêm địa chỉ giao hàng mới!');
  };

  // Lưu size ưu thích
  const handleSaveSizes = (e) => {
    e.preventDefault();
    setProfileData({
      ...profileData,
      shoeSize: tempSizes.shoeSize,
      apparelSize: tempSizes.apparelSize
    });
    setActiveModal(null);
    showToast('Cập nhật tùy chọn kích thước thành công!');
  };

  // Lưu loại tài khoản
  const handleSaveAccount = (e) => {
    e.preventDefault();
    setProfileData({
      ...profileData,
      accountType: tempAccountType
    });
    setActiveModal(null);
    showToast('Thay đổi loại tài khoản thành công!');
  };

  // Xóa địa chỉ
  const handleDeleteAddress = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    showToast('Đã xóa địa chỉ giao hàng.');
  };

  // Menu Sidebar & Dropdown đồng bộ cấu trúc
  const menuItems = [
    { id: 'profile', label: 'Profile', desc: 'Shipping, Email, Password, Shoe Size', icon: User },
    { id: 'buying', label: 'Buying', desc: 'Active Bids, In-Progress, Completed Orders', icon: Package },
    { id: 'selling', label: 'Selling', desc: 'Active Asks, Sales, Seller Profile', icon: TrendingUp },
    { id: 'favorites', label: 'Favorites', desc: "Items and lists you've saved", icon: Heart },
    { id: 'wallet', label: 'Wallet', desc: 'Payments, Payouts, Gift Cards, Credits', icon: CreditCard },
    { id: 'settings', label: 'Settings', desc: 'Security and Notifications', icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-[#0B0B0B] text-white font-sans selection:bg-emerald-500 selection:text-black overflow-y-auto">
      
      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between border-b bg-[#0B0B0B] border-neutral-800">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="font-extrabold text-xl tracking-wider select-none flex items-center gap-2">
            <span className="bg-emerald-500 text-black px-2 py-0.5 rounded text-sm font-black">N4</span>
            <span>BTL-N4</span>
          </div>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="hidden md:flex items-center flex-1 max-w-lg mx-8 relative">
          <Search className="absolute left-3 w-4 h-4 text-neutral-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm thương hiệu, phối màu, kích thước..." 
            className="w-full pl-10 pr-4 py-2 rounded-full text-sm outline-none border focus:ring-1 focus:ring-emerald-500 transition-all bg-[#161616] border-neutral-800 focus:border-neutral-700 text-white"
          />
        </div>

        {/* Các nút tương tác bên phải */}
        <div className="flex items-center gap-6">
          <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
          
          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-2 p-1.5 rounded-full border transition-all ${
                isDropdownOpen 
                  ? 'border-emerald-500 bg-emerald-500/10' 
                  : 'border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-black font-bold text-xs">
                {profileData.name.substring(0, 2).toUpperCase()}
              </div>
              <span className="hidden sm:inline text-xs font-semibold pr-1">{profileData.name}</span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl shadow-2xl border overflow-hidden animate-in fade-in slide-in-from-top-3 duration-150 z-50 bg-[#181818] border-neutral-800 text-white shadow-black/80">
                <div className="px-4 py-3 border-b border-neutral-800/60 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold">
                    {profileData.name.charAt(0)}
                  </div>
                  <div className="truncate">
                    <p className="font-bold text-sm leading-tight">{profileData.name}</p>
                    <p className="text-xs text-neutral-400 truncate">{profileData.email}</p>
                  </div>
                </div>

                <div className="p-1.5">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all ${
                          activeTab === item.id 
                            ? 'bg-emerald-500 text-black font-semibold' 
                            : 'hover:bg-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${activeTab === item.id ? 'text-black' : 'text-neutral-400'}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}

                  <div className="my-1 border-t border-neutral-800"></div>

                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* CONTAINER CHÍNH */}
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row min-h-[calc(100vh-73px)]">
        
        {/* SIDEBAR BÊN TRÁI */}
        <aside className="w-full md:w-[320px] flex-shrink-0 border-r flex flex-col justify-between p-6 bg-[#0B0B0B] border-neutral-800">
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-black tracking-tight">{profileData.name}</h2>
              <p className="text-xs text-neutral-500 mt-1 uppercase tracking-widest font-mono">Thành viên lâu năm</p>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left p-3.5 rounded-xl transition-all duration-200 flex items-start gap-4 border ${
                      isSelected 
                        ? 'bg-[#161616] border-neutral-800 text-white ring-1 ring-emerald-500/20' 
                        : 'border-transparent hover:bg-neutral-900/40 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className={`p-2 rounded-lg mt-0.5 ${isSelected ? 'bg-emerald-500/10 text-emerald-500' : 'bg-neutral-800/50'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                        {item.label}
                      </p>
                      <p className="text-[11px] text-neutral-500 mt-0.5 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}

              <button
                onClick={onLogout}
                className="w-full text-left p-3.5 rounded-xl text-red-500 hover:bg-red-500/5 transition-colors flex items-center gap-4 border border-transparent"
              >
                <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                  <LogOut className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">Log Out</p>
                  <p className="text-xs text-red-400/60 mt-0.5">Thoát tài khoản an toàn</p>
                </div>
              </button>
            </nav>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-neutral-600">SNEAKER HUB v1.4.2</span>
          </div>
        </aside>

        {/* NỘI DUNG CHÍNH BÊN PHẢI */}
        <main className="flex-1 p-6 md:p-10">
          
          {activeTab === 'profile' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
              
              <div>
                <h1 className="text-3xl font-black tracking-tight">Profile</h1>
                <p className="text-neutral-400 text-sm mt-1">Quản lý và cập nhật thông tin cá nhân của bạn.</p>
              </div>

              {/* 1. Personal Information */}
              <section className="border rounded-2xl overflow-hidden border-neutral-800 bg-[#121212]/30">
                <div className="px-6 py-5 flex items-center justify-between border-b border-neutral-800/80">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                      <User className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-extrabold tracking-tight">Personal Information</h2>
                  </div>
                  <button 
                    onClick={() => openModal('profile')}
                    className="px-4 py-1.5 text-xs font-bold rounded-full border border-white text-white hover:bg-white hover:text-black transition-all"
                  >
                    Edit
                  </button>
                </div>
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider mb-1">Name</p>
                    <p className="font-semibold text-base">{profileData.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider mb-1">Email Address</p>
                    <p className="font-semibold text-base break-all">{profileData.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider mb-1">Username</p>
                    <p className="font-semibold text-sm text-neutral-400 font-mono break-all">{profileData.username}</p>
                  </div>
                </div>
              </section>

              {/* 2. Shipping Addresses */}
              <section className="border rounded-2xl overflow-hidden border-neutral-800 bg-[#121212]/30">
                <div className="px-6 py-5 flex items-center justify-between border-b border-neutral-800/80">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-extrabold tracking-tight">Shipping Addresses</h2>
                  </div>
                  <button 
                    onClick={() => openModal('address')}
                    className="px-4 py-1.5 text-xs font-bold rounded-full border border-white text-white hover:bg-white hover:text-black transition-all"
                  >
                    Add
                  </button>
                </div>

                <div className="p-6">
                  {addresses.length === 0 ? (
                    <p className="text-sm text-neutral-500 py-2">
                      You do not have a shipping address saved.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map((addr, index) => (
                        <div 
                          key={index} 
                          className="p-4 rounded-xl border flex justify-between items-start border-neutral-800 bg-neutral-900/40"
                        >
                          <div>
                            <p className="font-bold text-sm">{addr.name}</p>
                            <p className="text-xs text-neutral-400 mt-1">{addr.phone}</p>
                            <p className="text-sm mt-2">{addr.address}, {addr.city}</p>
                          </div>
                          <button 
                            onClick={() => handleDeleteAddress(index)}
                            className="text-xs text-red-500 hover:text-red-400 font-bold"
                          >
                            Xóa
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* 3. Size Preferences */}
              <section className="border rounded-2xl overflow-hidden border-neutral-800 bg-[#121212]/30">
                <div className="px-6 py-5 flex items-center justify-between border-b border-neutral-800/80">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                      <Shield className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-extrabold tracking-tight">Size Preferences</h2>
                  </div>
                  <button 
                    onClick={() => openModal('sizes')}
                    className="px-4 py-1.5 text-xs font-bold rounded-full border border-white text-white hover:bg-white hover:text-black transition-all"
                  >
                    Edit
                  </button>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider mb-2">My Shoe Sizes</p>
                    <button 
                      onClick={() => openModal('sizes')}
                      className="text-emerald-400 text-sm font-bold hover:underline"
                    >
                      {profileData.shoeSize ? `US Men ${profileData.shoeSize}` : 'Set Sizes'}
                    </button>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider mb-2">My Apparel Sizes</p>
                    <button 
                      onClick={() => openModal('sizes')}
                      className="text-emerald-400 text-sm font-bold hover:underline"
                    >
                      {profileData.apparelSize ? profileData.apparelSize : 'Set Sizes'}
                    </button>
                  </div>
                </div>
              </section>

              {/* 4. Account Type */}
              <section className="border rounded-2xl overflow-hidden border-neutral-800 bg-[#121212]/30">
                <div className="px-6 py-5 flex items-center justify-between border-b border-neutral-800/80">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-extrabold tracking-tight">Account Type</h2>
                  </div>
                  <button 
                    onClick={() => openModal('account')}
                    className="px-4 py-1.5 text-xs font-bold rounded-full border border-white text-white hover:bg-white hover:text-black transition-all"
                  >
                    Edit
                  </button>
                </div>

                <div className="p-6">
                  <p className="font-semibold text-base">{profileData.accountType}</p>
                </div>
              </section>
            </div>
          )}

          {/* TAB 2: BUYING */}
          {activeTab === 'buying' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h1 className="text-3xl font-black tracking-tight">Buying</h1>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border border-neutral-800 bg-neutral-900/10 rounded-xl text-center">
                  <p className="text-2xl font-black text-emerald-500">
                    {orders.filter(o => o.status === 'Chờ xác nhận').length}
                  </p>
                  <p className="text-xs text-neutral-400 uppercase mt-1">Đang đặt giá (Bids)</p>
                </div>
                <div className="p-4 border border-neutral-800 bg-neutral-900/10 rounded-xl text-center">
                  <p className="text-2xl font-black text-blue-500">
                    {orders.filter(o => ['Đang xử lý', 'Đang giao'].includes(o.status)).length}
                  </p>
                  <p className="text-xs text-neutral-400 uppercase mt-1">Đang xử lý (In-Progress)</p>
                </div>
                <div className="p-4 border border-neutral-800 bg-neutral-900/10 rounded-xl text-center">
                  <p className="text-2xl font-black text-neutral-400">
                    {orders.filter(o => o.status === 'Hoàn thành').length}
                  </p>
                  <p className="text-xs text-neutral-400 uppercase mt-1">Đã hoàn thành</p>
                </div>
              </div>

              <div className="border border-neutral-800 rounded-xl overflow-hidden">
                <div className="p-4 bg-neutral-900/20 font-bold text-sm border-b border-neutral-800">Đơn Hàng Gần Đây</div>
                <div className="divide-y divide-neutral-800">
                  {orders.length > 0 ? orders.map((order) => (
                    <div key={order._id} className="p-4 flex justify-between items-center text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-neutral-800 rounded flex items-center justify-center font-bold text-xs uppercase">
                          {order.orderNumber.substring(0, 3)}
                        </div>
                        <div>
                          <p className="font-semibold">Đơn hàng #{order.orderNumber}</p>
                          <p className="text-xs text-neutral-400">Items: {order.items} | Trạng thái: {order.status}</p>
                        </div>
                      </div>
                      <p className="font-bold text-emerald-500">{order.amount.toLocaleString('vi-VN')}đ</p>
                    </div>
                  )) : (
                    <div className="p-8 text-center text-neutral-500 text-sm">Bạn chưa có đơn hàng nào.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SELLING */}
          {activeTab === 'selling' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h1 className="text-3xl font-black tracking-tight">Selling</h1>
              
              <div className="p-12 border border-dashed border-neutral-800 rounded-2xl text-center">
                <TrendingUp className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <p className="font-bold text-lg">Bạn chưa có sản phẩm đăng bán nào</p>
                <p className="text-sm text-neutral-400 mt-1 max-w-sm mx-auto">Kiếm tiền cực dễ bằng cách liệt kê và gửi các sản phẩm giày, áo không dùng tới của bạn lên Sneaker Hub.</p>
                <button className="mt-4 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-sm rounded-full transition-colors">
                  Bán Ngay
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: FAVORITES */}
          {activeTab === 'favorites' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h1 className="text-3xl font-black tracking-tight">Favorites</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.length > 0 ? favorites.map((item) => (
                  <div key={item._id} className="border border-neutral-800 rounded-2xl overflow-hidden p-4 relative group">
                    <button 
                      onClick={() => handleToggleFavorite(item._id)}
                      className="absolute top-4 right-4 text-rose-500 hover:text-neutral-400"
                    >
                      <Heart className="w-5 h-5 fill-current" />
                    </button>
                    <div className="h-48 bg-neutral-900/30 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain p-4" />
                    </div>
                    <h3 className="font-extrabold text-base truncate">{item.name}</h3>
                    <p className="text-xs text-neutral-400 mt-1">{item.brand}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] text-neutral-500 uppercase font-mono">Giá</p>
                        <p className="font-black text-emerald-500">{item.price.toLocaleString('vi-VN')}đ</p>
                      </div>
                      <button className="px-3 py-1.5 bg-neutral-800 text-xs font-bold rounded-lg hover:bg-neutral-700 transition-colors">Mua ngay</button>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full py-12 text-center text-neutral-500">
                    <Heart className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>Danh sách yêu thích của bạn đang trống.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {['wallet', 'settings'].includes(activeTab) && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h1 className="text-3xl font-black capitalize tracking-tight">{activeTab}</h1>
              <div className="p-8 border border-neutral-800 bg-neutral-900/5 rounded-2xl">
                <p className="text-sm text-neutral-400">Trực quan hóa tab <span className="text-emerald-500 font-bold">{activeTab}</span> với các tùy chỉnh sâu hơn đang được thiết lập riêng cho bạn.</p>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-black px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <Check className="w-5 h-5 font-black" />
          <span className="font-bold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* MODALS */}
      {activeModal === 'profile' && (
        <div className="fixed inset-0 bg-black/75 z-[300] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#161616] border border-neutral-800 w-full max-w-md rounded-2xl overflow-hidden p-6 animate-in zoom-in-95 duration-150 text-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black tracking-tight">Sửa Thông Tin Cá Nhân</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full hover:bg-neutral-800"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs text-neutral-400 uppercase font-bold tracking-wider mb-1">Họ Và Tên</label>
                <input 
                  type="text" 
                  value={tempProfile.name}
                  onChange={e => setTempProfile({...tempProfile, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm focus:outline-none focus:border-emerald-500 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 uppercase font-bold tracking-wider mb-1">Địa Chỉ Email</label>
                <input 
                  type="email" 
                  value={tempProfile.email}
                  onChange={e => setTempProfile({...tempProfile, email: e.target.value})}
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm focus:outline-none focus:border-emerald-500 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 uppercase font-bold tracking-wider mb-1">Tên Người Dùng (Username)</label>
                <input 
                  type="text" 
                  value={tempProfile.username}
                  onChange={e => setTempProfile({...tempProfile, username: e.target.value})}
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm font-mono focus:outline-none focus:border-emerald-500 text-white"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-neutral-800">
                <button 
                  type="button"
                  onClick={() => setActiveModal(null)} 
                  className="px-4 py-2 text-xs font-bold rounded-full border border-neutral-700 text-neutral-400 hover:text-white"
                >
                  Hủy
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-xs font-bold rounded-full bg-emerald-500 hover:bg-emerald-600 text-black"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Thêm địa chỉ mới */}
      {activeModal === 'address' && (
        <div className="fixed inset-0 bg-black/75 z-[300] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#161616] border border-neutral-800 w-full max-w-md rounded-2xl overflow-hidden p-6 animate-in zoom-in-95 duration-150 text-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black tracking-tight">Thêm Địa Chỉ Giao Hàng</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full hover:bg-neutral-800"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveAddress} className="space-y-4">
              <div>
                <label className="block text-xs text-neutral-400 uppercase font-bold tracking-wider mb-1">Tên Người Nhận</label>
                <input 
                  type="text" 
                  placeholder="Ví dụ: Tuấn Huy"
                  value={tempAddress.name}
                  onChange={e => setTempAddress({...tempAddress, name: e.target.value})}
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm focus:outline-none focus:border-emerald-500 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 uppercase font-bold tracking-wider mb-1">Số Điện Thoại</label>
                <input 
                  type="text" 
                  placeholder="Ví dụ: 0987654321"
                  value={tempAddress.phone}
                  onChange={e => setTempAddress({...tempAddress, phone: e.target.value})}
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm focus:outline-none focus:border-emerald-500 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 uppercase font-bold tracking-wider mb-1">Địa Chỉ Chi Tiết</label>
                <input 
                  type="text" 
                  placeholder="Ví dụ: Số 123 Đường Nguyễn Trãi"
                  value={tempAddress.address}
                  onChange={e => setTempAddress({...tempAddress, address: e.target.value})}
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm focus:outline-none focus:border-emerald-500 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 uppercase font-bold tracking-wider mb-1">Thành Phố</label>
                <input 
                  type="text" 
                  placeholder="Ví dụ: Hà Nội"
                  value={tempAddress.city}
                  onChange={e => setTempAddress({...tempAddress, city: e.target.value})}
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm focus:outline-none focus:border-emerald-500 text-white"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-neutral-800">
                <button 
                  type="button"
                  onClick={() => setActiveModal(null)} 
                  className="px-4 py-2 text-xs font-bold rounded-full border border-neutral-700 text-neutral-400 hover:text-white"
                >
                  Hủy
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-xs font-bold rounded-full bg-emerald-500 hover:bg-emerald-600 text-black"
                >
                  Lưu địa chỉ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal cấu hình size */}
      {activeModal === 'sizes' && (
        <div className="fixed inset-0 bg-black/75 z-[300] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#161616] border border-neutral-800 w-full max-w-md rounded-2xl overflow-hidden p-6 animate-in zoom-in-95 duration-150 text-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black tracking-tight">Cài Đặt Size Ưu Thích</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full hover:bg-neutral-800"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveSizes} className="space-y-4">
              <div>
                <label className="block text-xs text-neutral-400 uppercase font-bold tracking-wider mb-2">Size Giày Thường Dùng (US Men)</label>
                <select 
                  value={tempSizes.shoeSize} 
                  onChange={e => setTempSizes({...tempSizes, shoeSize: e.target.value})}
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm focus:outline-none focus:border-emerald-500 text-white"
                >
                  <option value="">Chưa thiết lập</option>
                  <option value="7">7 (39-40)</option>
                  <option value="8">8 (41)</option>
                  <option value="8.5">8.5 (41-42)</option>
                  <option value="9">9 (42.5)</option>
                  <option value="9.5">9.5 (43)</option>
                  <option value="10">10 (44)</option>
                  <option value="10.5">10.5 (44.5)</option>
                  <option value="11">11 (45)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-neutral-400 uppercase font-bold tracking-wider mb-2">Size Quần Áo Ưu Thích</label>
                <div className="grid grid-cols-4 gap-2">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => setTempSizes({...tempSizes, apparelSize: size})}
                      className={`py-2 text-sm font-bold rounded-lg border transition-all ${
                        tempSizes.apparelSize === size
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500'
                          : 'border-neutral-800 bg-neutral-900 hover:border-neutral-700 text-neutral-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-neutral-800">
                <button 
                  type="button"
                  onClick={() => setActiveModal(null)} 
                  className="px-4 py-2 text-xs font-bold rounded-full border border-neutral-700 text-neutral-400 hover:text-white"
                >
                  Hủy
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-xs font-bold rounded-full bg-emerald-500 hover:bg-emerald-600 text-black"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal đổi loại tài khoản */}
      {activeModal === 'account' && (
        <div className="fixed inset-0 bg-black/75 z-[300] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#161616] border border-neutral-800 w-full max-w-md rounded-2xl overflow-hidden p-6 animate-in zoom-in-95 duration-150 text-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black tracking-tight">Đổi Loại Tài Khoản</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full hover:bg-neutral-800"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveAccount} className="space-y-4">
              <div className="space-y-3">
                {[
                  { id: 'Cá nhân (Individual)', label: 'Tài Khoản Cá Nhân', desc: 'Sử dụng cho mục đích mua bán cá nhân nhỏ lẻ.' },
                  { id: 'Chuyên Nghiệp (Professional)', label: 'Tài Khoản Chuyên Nghiệp', desc: 'Dành cho các cửa hàng, hộ kinh doanh có doanh số lớn hơn.' }
                ].map((acc) => (
                  <label 
                    key={acc.id}
                    className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                      tempAccountType === acc.id
                        ? 'border-emerald-500 bg-emerald-500/5'
                        : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">{acc.label}</span>
                      <input 
                        type="radio" 
                        name="accountType" 
                        value={acc.id}
                        checked={tempAccountType === acc.id}
                        onChange={() => setTempAccountType(acc.id)}
                        className="accent-emerald-500"
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">{acc.desc}</p>
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-neutral-800">
                <button 
                  type="button"
                  onClick={() => setActiveModal(null)} 
                  className="px-4 py-2 text-xs font-bold rounded-full border border-neutral-700 text-neutral-400 hover:text-white"
                >
                  Hủy
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-xs font-bold rounded-full bg-emerald-500 hover:bg-emerald-600 text-black"
                >
                  Xác nhận thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserProfile;