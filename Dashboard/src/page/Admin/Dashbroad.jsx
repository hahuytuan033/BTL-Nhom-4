import AdminLayout from "../../component/Adminlayout";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState({
    products: [],
    orders: [],
    users: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/products`),
          axios.get(`${import.meta.env.VITE_API_URL}/orders`),
          axios.get(`${import.meta.env.VITE_API_URL}/users`)
        ]);

        setData({
          products: productsRes.data,
          orders: ordersRes.data,
          users: usersRes.data
        });
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu dashboard", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateTotalRevenue = () => {
    return data.orders
      .filter(order => order.status === "Hoàn thành")
      .reduce((total, order) => total + order.amount, 0);
  };

  const getRecentOrders = () => {
    return data.orders.slice(0, 5); // Lấy 5 đơn hàng mới nhất
  };

  const getTopProducts = () => {
    // Sắp xếp sản phẩm theo số lượng kho thấp nhất (chỉ mang tính minh họa nếu không có trường sales)
    return [...data.products].sort((a, b) => a.stock - b.stock).slice(0, 4);
  };

  const stats = [
    {
      id: 1,
      title: "Tổng Sản Phẩm",
      value: data.products.length,
      icon: "📦",
      color: "#3B82F6",
    },
    {
      id: 2,
      title: "Đơn Hàng (Tất cả)",
      value: data.orders.length,
      icon: "🛒",
      color: "#10B981",
    },
    {
      id: 3,
      title: "Khách Hàng",
      value: data.users.filter(u => u.role === 'user').length,
      icon: "👥",
      color: "#F59E0B",
    },
    {
      id: 4,
      title: "Doanh Thu",
      value: `${(calculateTotalRevenue() / 1000000).toFixed(1)}M`,
      icon: "💰",
      color: "#EF4444",
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Hoàn thành": return "#10B981";
      case "Đang xử lý": return "#F59E0B";
      case "Chờ xác nhận": return "#3B82F6";
      case "Đang giao": return "#8B5CF6";
      default: return "#6B7280";
    }
  };

  if (loading) return <AdminLayout><div className="page-container">Đang tải Dashboard...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="page-container">
        <div className="section-header">
          <div>
            <h1 className="section-title">Bảng Điều Khiển</h1>
            <p className="section-subtitle">Dữ liệu được cập nhật theo thời gian thực từ MongoDB</p>
          </div>
        </div>

        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-card">
              <div className="stat-header">
                <div className="metric-icon" style={{ color: stat.color }}>
                  {stat.icon}
                </div>
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
              <button type="button" className="card-link" onClick={() => window.location.href='/orders'}>Xem tất cả →</button>
            </div>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr className="table-header">
                    <th className="th">Mã Đơn Hàng</th>
                    <th className="th">Khách Hàng</th>
                    <th className="th">Số Tiền</th>
                    <th className="th">Trạng Thái</th>
                  </tr>
                </thead>
                <tbody>
                  {getRecentOrders().map((order) => (
                    <tr key={order._id} className="table-row">
                      <td className="td">
                        <span className="order-number">{order.orderNumber}</span>
                      </td>
                      <td className="td">{order.customer}</td>
                      <td className="td">
                        <strong style={{ color: "#10B981" }}>{order.amount.toLocaleString('vi-VN')} đ</strong>
                      </td>
                      <td className="td">
                        <span className="badge" style={{ backgroundColor: getStatusColor(order.status), color: "#fff" }}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {getRecentOrders().length === 0 && (
                    <tr className="table-row">
                      <td colSpan="4" className="td" style={{textAlign: 'center'}}>Chưa có đơn hàng nào</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Sản Phẩm Đang Theo Dõi (Ít Kho)</h2>
              <button type="button" className="card-link" onClick={() => window.location.href='/products'}>Xem tất cả →</button>
            </div>
            <div className="product-list">
              {getTopProducts().map((product, index) => (
                <div key={product._id} className="product-item">
                  <div className="product-rank">{index + 1}</div>
                  <div className="product-info">
                    <h4 className="product-name">{product.name}</h4>
                    <p className="product-sales">Còn {product.stock} sản phẩm</p>
                  </div>
                  <div className="product-revenue">{product.price.toLocaleString('vi-VN')} đ</div>
                </div>
              ))}
              {getTopProducts().length === 0 && (
                <div style={{textAlign: 'center', color: '#6b7280', padding: '20px'}}>Chưa có sản phẩm nào</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
