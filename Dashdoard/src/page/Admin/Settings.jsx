import AdminLayout from "../../component/Adminlayout";
import { useState } from "react";

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: "E-Commerce Admin",
    siteUrl: "https://example.com",
    siteEmail: "admin@example.com",
    sitePhone: "+84 901 234 567",
    currency: "VND",
    timezone: "Asia/Ho_Chi_Minh",
    language: "vi_VN"
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderAlerts: true,
    stockAlerts: true,
    userRegistration: true
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAttempts: "5"
  });

  const [activeTab, setActiveTab] = useState("general");

  const handleSettingChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleNotificationChange = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handleSecurityChange = (key, value) => {
    setSecurity({ ...security, [key]: value });
  };

  const handleSave = () => {
    alert("Cài đặt đã được lưu!");
  };

  return (
    <AdminLayout>
      <div className="page-container">
        <div className="section-header">
          <h1 className="section-title">Cài Đặt Hệ Thống</h1>
        </div>

        <div className="tabs-container">
          {["general", "notifications", "security", "about"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`tab-btn${activeTab === tab ? " active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "general" && "⚙️ Cài Đặt Chung"}
              {tab === "notifications" && "🔔 Thông Báo"}
              {tab === "security" && "🔒 Bảo Mật"}
              {tab === "about" && "ℹ️ Thông Tin"}
            </button>
          ))}
        </div>

        <div className="card">
          {activeTab === "general" && (
            <div>
              <h2 className="section-title">Cài Đặt Chung</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label className="info-label">Tên Trang Web</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => handleSettingChange("siteName", e.target.value)}
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label className="info-label">URL Trang Web</label>
                  <input
                    type="text"
                    value={settings.siteUrl}
                    onChange={(e) => handleSettingChange("siteUrl", e.target.value)}
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label className="info-label">Email Quản Trị</label>
                  <input
                    type="email"
                    value={settings.siteEmail}
                    onChange={(e) => handleSettingChange("siteEmail", e.target.value)}
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label className="info-label">Điện Thoại</label>
                  <input
                    type="tel"
                    value={settings.sitePhone}
                    onChange={(e) => handleSettingChange("sitePhone", e.target.value)}
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label className="info-label">Tiền Tệ</label>
                  <select
                    value={settings.currency}
                    onChange={(e) => handleSettingChange("currency", e.target.value)}
                    className="input"
                  >
                    <option>VND</option>
                    <option>USD</option>
                    <option>EUR</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="info-label">Múi Giờ</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleSettingChange("timezone", e.target.value)}
                    className="input"
                  >
                    <option>Asia/Ho_Chi_Minh</option>
                    <option>Asia/Bangkok</option>
                    <option>Asia/Singapore</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="info-label">Ngôn Ngữ</label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleSettingChange("language", e.target.value)}
                    className="input"
                  >
                    <option value="vi_VN">Tiếng Việt</option>
                    <option value="en_US">English</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div>
              <h2 className="section-title">Cài Đặt Thông Báo</h2>
              <div className="notifications-list">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="notification-item">
                    <div>
                      <p className="notification-title">
                        {key === "emailNotifications" && "📧 Thông Báo Qua Email"}
                        {key === "smsNotifications" && "📱 Thông Báo SMS"}
                        {key === "orderAlerts" && "📦 Cảnh Báo Đơn Hàng"}
                        {key === "stockAlerts" && "🏪 Cảnh Báo Tồn Kho"}
                        {key === "userRegistration" && "👤 Cảnh Báo Đăng Ký Người Dùng"}
                      </p>
                      <p className="notification-desc">Nhận thông báo về sự kiện quan trọng</p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handleNotificationChange(key)}
                        style={{ display: "none" }}
                      />
                      <span
                        className="switch-slider"
                        style={{ backgroundColor: value ? "var(--success)" : "#D1D5DB" }}
                      ></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <h2 className="section-title">Cài Đặt Bảo Mật</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label className="info-label">Xác Thực Hai Lớp</label>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={security.twoFactorAuth}
                      onChange={(e) => handleSecurityChange("twoFactorAuth", e.target.checked)}
                      style={{ display: "none" }}
                    />
                    <span
                      className="switch-slider"
                      style={{ backgroundColor: security.twoFactorAuth ? "var(--success)" : "#D1D5DB" }}
                    ></span>
                  </label>
                </div>
                <div className="form-group">
                  <label className="info-label">Thời Gian Hết Phiên (phút)</label>
                  <input
                    type="number"
                    value={security.sessionTimeout}
                    onChange={(e) => handleSecurityChange("sessionTimeout", e.target.value)}
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label className="info-label">Hết Hạn Mật Khẩu (ngày)</label>
                  <input
                    type="number"
                    value={security.passwordExpiry}
                    onChange={(e) => handleSecurityChange("passwordExpiry", e.target.value)}
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label className="info-label">Giới Hạn Lần Đăng Nhập Thất Bại</label>
                  <input
                    type="number"
                    value={security.loginAttempts}
                    onChange={(e) => handleSecurityChange("loginAttempts", e.target.value)}
                    className="input"
                  />
                </div>
              </div>
              <button type="button" className="danger-btn" onClick={() => alert("Sẽ thay đổi mật khẩu")}>
                🔐 Thay Đổi Mật Khẩu
              </button>
            </div>
          )}

          {activeTab === "about" && (
            <div>
              <h2 className="section-title">Thông Tin Hệ Thống</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Phiên Bản</span>
                  <span className="info-value">1.0.0</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Ngày Tạo</span>
                  <span className="info-value">2024-01-15</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Được Phát Triển Bởi</span>
                  <span className="info-value">BTL Nhóm 4</span>
                </div>
                <div className="info-item">
                  <span className="info-label">React Version</span>
                  <span className="info-value">19.2.5</span>
                </div>
              </div>
            </div>
          )}

          <div className="button-group">
            <button type="button" className="save-btn" onClick={handleSave}>
              💾 Lưu Cài Đặt
            </button>
            <button type="button" className="reset-btn">↻ Đặt Lại</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

