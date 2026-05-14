import AdminLayout from "../../component/Adminlayout";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/orders`);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải dữ liệu đơn hàng');
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const statuses = ["Tất cả", "Chờ xác nhận", "Đang xử lý", "Đang giao", "Hoàn thành"];

  const filteredOrders = selectedStatus === "Tất cả"
    ? orders
    : orders.filter(order => order.status === selectedStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case "Hoàn thành":
        return "var(--success)";
      case "Đang xử lý":
        return "var(--warning)";
      case "Chờ xác nhận":
        return "var(--primary)";
      case "Đang giao":
        return "#8B5CF6";
      default:
        return "var(--muted)";
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/orders/${orderId}/status`, { status: newStatus });
      setOrders(orders.map(order => order._id === orderId ? data : order));
    } catch (err) {
      alert("Lỗi khi cập nhật trạng thái đơn hàng");
    }
  };

  if (loading) return <AdminLayout><div className="page-container">Đang tải...</div></AdminLayout>;
  if (error) return <AdminLayout><div className="page-container">{error}</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="page-container">
        <div className="section-header">
          <h1 className="section-title">Quản Lý Đơn Hàng</h1>
        </div>

        <div className="filter-section">
          {statuses.map((status) => (
            <button
              key={status}
              type="button"
              className={`filter-btn${selectedStatus === status ? " active" : ""}`}
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="th">Mã Đơn Hàng</th>
                  <th className="th">Khách Hàng</th>
                  <th className="th">Số Lượng</th>
                  <th className="th">Số Tiền</th>
                  <th className="th">Trạng Thái</th>
                  <th className="th">Ngày Tạo</th>
                  <th className="th">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="table-row">
                    <td className="td">
                      <span className="order-number">{order.orderNumber}</span>
                    </td>
                    <td className="td">{order.customer}</td>
                    <td className="td">
                      <span className="item-count">{order.items} sản phẩm</span>
                    </td>
                    <td className="td">
                      <strong style={{ color: "var(--success)" }}>{order.amount.toLocaleString('vi-VN')} đ</strong>
                    </td>
                    <td className="td">
                      <span
                        className="badge"
                        style={{
                          backgroundColor: getStatusColor(order.status),
                          color: "#fff"
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="td">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td className="td">
                      <button type="button" className="view-btn">👁️ Xem</button>
                      {order.status !== "Hoàn thành" && (
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="status-select"
                        >
                          <option value="Chờ xác nhận">Chờ xác nhận</option>
                          <option value="Đang xử lý">Đang xử lý</option>
                          <option value="Đang giao">Đang giao</option>
                          <option value="Hoàn thành">Hoàn thành</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-number">{orders.length}</div>
            <div className="stat-label">Tổng Đơn Hàng</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{orders.filter(o => o.status === "Chờ xác nhận").length}</div>
            <div className="stat-label">Chờ Xác Nhận</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{orders.filter(o => o.status === "Đang giao").length}</div>
            <div className="stat-label">Đang Giao</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{orders.filter(o => o.status === "Hoàn thành").length}</div>
            <div className="stat-label">Hoàn Thành</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
