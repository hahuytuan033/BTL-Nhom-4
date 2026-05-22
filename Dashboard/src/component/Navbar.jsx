import { useState, useEffect } from "react";
import axios from "axios";

export default function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [usersRes, ordersRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/users`),
          axios.get(`${import.meta.env.VITE_API_URL}/orders`)
        ]);

        const userEvents = usersRes.data.map(u => ({
          id: `u-${u._id}`,
          text: `${u.fullName || "Khách hàng"} đã đăng kí tài khoản`,
          time: new Date(u.createdAt)
        }));

        const orderEvents = ordersRes.data.map(o => ({
          id: `o-${o._id}`,
          text: `${o.customer} đã đặt đơn hàng ${o.orderNumber}`,
          time: new Date(o.createdAt)
        }));

        const allEvents = [...userEvents, ...orderEvents].sort((a, b) => b.time - a.time).slice(0, 10);
        setNotifications(allEvents);
      } catch (err) {
        console.error("Lỗi khi tải thông báo", err);
      }
    };
    fetchEvents();
  }, []);

  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h3 className="navbar-title">Bảng Điều Khiển Quản Lý</h3>
      </div>

      <div className="navbar-right">
        <div className="navbar-search">
          <span className="navbar-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="navbar-search-input"
          />
        </div>

        <div className="navbar-notification">
          <button onClick={() => setShowNotifications(!showNotifications)} className="navbar-notification-button">🔔
            {notifications.length > 0 && <span className="navbar-badge">{notifications.length}</span>}
          </button>
          {showNotifications && (
            <div className="navbar-user-dropdown" style={{ 
              right: '80px', 
              top: '60px', 
              width: '320px', 
              maxHeight: '400px', 
              overflowY: 'auto',
              padding: '0'
            }}>
              <div className="navbar-user-info" style={{ fontWeight: 'bold', borderBottom: '1px solid #e5e7eb' }}>
                Thông báo gần đây
              </div>
              {notifications.length > 0 ? (
                notifications.map(n => (
                  <div key={n.id} className="navbar-user-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                    <span style={{ fontSize: '13px', flex: 1 }}>{n.text}</span>
                    <button 
                      onClick={() => handleMarkAsRead(n.id)} 
                      className="status-btn" 
                      style={{ fontSize: '10px', padding: '4px 8px', backgroundColor: 'var(--success)' }}
                    >
                      Đã đọc
                    </button>
                  </div>
                ))
              ) : (
                <div className="navbar-user-item" style={{ textAlign: 'center', color: '#9ca3af' }}>Không có thông báo mới</div>
              )}
            </div>
          )}
        </div>

        <div className="navbar-user">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="navbar-user-button"
          >
            <div className="navbar-user-avatar">A</div>
            <span>Admin</span>
            <span>▼</span>
          </button>

          {showUserMenu && (
            <div className="navbar-user-dropdown">
              <div className="navbar-user-info">
                <p className="navbar-user-name">👤 Admin User</p>
                <p className="navbar-user-email">admin@example.com</p>
              </div>
              <button className="navbar-user-item">⚙️ Cài Đặt Hồ Sơ</button>
              <button className="navbar-user-item">🔐 Thay Đổi Mật Khẩu</button>
              <button onClick={handleLogout} className="navbar-user-item" style={{ color: "#EF4444" }}>
                🚪 Đăng Xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
