import AdminLayout from "../../component/Adminlayout";
import { useState } from "react";

export default function Dashboard() {
  const [stats] = useState([
    {
      id: 1,
      title: "Tổng Sản Phẩm",
      value: "1,248",
      icon: "📦",
      color: "#3B82F6",
      change: "+12%"
    },
    {
      id: 2,
      title: "Đơn Hàng Hôm Nay",
      value: "84",
      icon: "🛒",
      color: "#10B981",
      change: "+8%"
    },
    {
      id: 3,
      title: "Người Dùng Tích Cực",
      value: "356",
      icon: "👥",
      color: "#F59E0B",
      change: "+5%"
    },
    {
      id: 4,
      title: "Doanh Thu",
      value: "2.5T",
      icon: "💰",
      color: "#EF4444",
      change: "+15%"
    }
  ]);

  const [recentOrders] = useState([
    {
      id: 1,
      orderNumber: "#ORD-2024-001",
      customer: "Nguyễn Văn A",
      amount: "1.5M",
      status: "Hoàn thành",
      date: "2024-05-08"
    },
    {
      id: 2,
      orderNumber: "#ORD-2024-002",
      customer: "Trần Thị B",
      amount: "2.3M",
      status: "Đang xử lý",
      date: "2024-05-07"
    },
    {
      id: 3,
      orderNumber: "#ORD-2024-003",
      customer: "Lê Văn C",
      amount: "890K",
      status: "Chờ xác nhận",
      date: "2024-05-07"
    },
    {
      id: 4,
      orderNumber: "#ORD-2024-004",
      customer: "Phạm Thị D",
      amount: "3.2M",
      status: "Hoàn thành",
      date: "2024-05-06"
    },
    {
      id: 5,
      orderNumber: "#ORD-2024-005",
      customer: "Đặng Văn E",
      amount: "1.8M",
      status: "Đang giao",
      date: "2024-05-06"
    }
  ]);

  const [topProducts] = useState([
    { id: 1, name: "Giày Thể Thao Nike Air Max", sales: 245, revenue: "6.1M" },
    { id: 2, name: "Giày Sneaker Adidas Superstar", sales: 198, revenue: "5.7M" },
    { id: 3, name: "Giày Chạy Bộ New Balance", sales: 156, revenue: "4.3M" },
    { id: 4, name: "Giày Da Nam Classic", sales: 234, revenue: "7.0M" }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Hoàn thành":
        return "#10B981";
      case "Đang xử lý":
        return "#F59E0B";
      case "Chờ xác nhận":
        return "#3B82F6";
      case "Đang giao":
        return "#8B5CF6";
      default:
        return "#6B7280";
    }
  };

  return (
    <AdminLayout>
      <div className="page-container">
        <div className="section-header">
          <div>
            <h1 className="section-title">Bảng Điều Khiển</h1>
            <p className="section-subtitle">Chào mừng quay lại, Admin!</p>
          </div>
        </div>

        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-card">
              <div className="stat-header">
                <div className="metric-icon" style={{ color: stat.color }}>
                  {stat.icon}
                </div>
                <span className="stat-change" style={{ color: stat.color }}>
                  {stat.change}
                </span>
              </div>
              <p className="stat-label">{stat.title}</p>
              <h2 className="stat-number">{stat.value}</h2>
            </div>
          ))}
        </div>

        <div className="charts-grid">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Đơn Hàng Gần Đây</h2>
              <button type="button" className="card-link">Xem tất cả →</button>
            </div>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr className="table-header">
                    <th className="th">Mã Đơn Hàng</th>
                    <th className="th">Khách Hàng</th>
                    <th className="th">Số Tiền</th>
                    <th className="th">Trạng Thái</th>
                    <th className="th">Ngày</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="table-row">
                      <td className="td">
                        <span className="order-number">{order.orderNumber}</span>
                      </td>
                      <td className="td">{order.customer}</td>
                      <td className="td">
                        <strong style={{ color: "#10B981" }}>{order.amount}</strong>
                      </td>
                      <td className="td">
                        <span className="badge" style={{ backgroundColor: getStatusColor(order.status), color: "#fff" }}>
                          {order.status}
                        </span>
                      </td>
                      <td className="td">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Sản Phẩm Bán Chạy Nhất</h2>
              <button type="button" className="card-link">Xem tất cả →</button>
            </div>
            <div className="product-list">
              {topProducts.map((product, index) => (
                <div key={product.id} className="product-item">
                  <div className="product-rank">{index + 1}</div>
                  <div className="product-info">
                    <h4 className="product-name">{product.name}</h4>
                    <p className="product-sales">{product.sales} bán hàng</p>
                  </div>
                  <div className="product-revenue">{product.revenue}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card summary-card">
          <h2 className="card-title">Hành Động Nhanh</h2>
          <div className="actions-grid">
            <button className="action-btn">
              <span className="action-icon">➕</span>
              <span>Tạo Đơn Hàng</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">👥</span>
              <span>Thêm Khách Hàng</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">📦</span>
              <span>Thêm Sản Phẩm</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">📊</span>
              <span>Xem Báo Cáo</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

