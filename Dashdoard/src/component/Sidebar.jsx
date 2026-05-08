import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: "/", label: "Dashboard", icon: "📊" },
    { path: "/products", label: "Sản Phẩm", icon: "📦" },
    { path: "/orders", label: "Đơn Hàng", icon: "🛒" },
    { path: "/users", label: "Khách Hàng", icon: "👥" },
    { path: "/reports", label: "Báo Cáo", icon: "📈" },
    { path: "/settings", label: "Cài Đặt", icon: "⚙️" }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={isCollapsed ? "sidebar collapsed" : "sidebar"}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-avatar">A</div>
          {!isCollapsed && <h2 className="sidebar-title">Admin</h2>}
        </div>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="sidebar-toggle">
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          {menuItems.map((item) => (
            <li key={item.path} className="sidebar-nav-item">
              <Link
                to={item.path}
                className={isActive(item.path) ? "sidebar-nav-link active" : "sidebar-nav-link"}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={isCollapsed ? "sidebar-footer center" : "sidebar-footer"}>
        {!isCollapsed && <p style={{ margin: 0 }}>v1.0.0</p>}
      </div>
    </div>
  );
}
