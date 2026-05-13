import { useState } from "react";

export default function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications] = useState(3);

  const handleLogout = () => {
    console.log("Logged out");
    // Add logout logic here
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
          <button className="navbar-notification-button">🔔
            {notifications > 0 && <span className="navbar-badge">{notifications}</span>}
          </button>
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
