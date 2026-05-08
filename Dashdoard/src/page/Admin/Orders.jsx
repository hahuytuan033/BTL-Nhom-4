import AdminLayout from "../../component/Adminlayout";
import { useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: "#ORD-2024-001",
      customer: "Nguyễn Văn A",
      amount: "1.5M",
      status: "Hoàn thành",
      date: "2024-05-08",
      items: 3
    },
    {
      id: 2,
      orderNumber: "#ORD-2024-002",
      customer: "Trần Thị B",
      amount: "2.3M",
      status: "Đang xử lý",
      date: "2024-05-07",
      items: 5
    },
    {
      id: 3,
      orderNumber: "#ORD-2024-003",
      customer: "Lê Văn C",
      amount: "890K",
      status: "Chờ xác nhận",
      date: "2024-05-07",
      items: 2
    },
    {
      id: 4,
      orderNumber: "#ORD-2024-004",
      customer: "Phạm Thị D",
      amount: "3.2M",
      status: "Hoàn thành",
      date: "2024-05-06",
      items: 4
    },
    {
      id: 5,
      orderNumber: "#ORD-2024-005",
      customer: "Đặng Văn E",
      amount: "1.8M",
      status: "Đang giao",
      date: "2024-05-06",
      items: 1
    }
  ]);

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

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

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
                  <th className="th">Ngày</th>
                  <th className="th">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="table-row">
                    <td className="td">
                      <span className="order-number">{order.orderNumber}</span>
                    </td>
                    <td className="td">{order.customer}</td>
                    <td className="td">
                      <span className="item-count">{order.items} sản phẩm</span>
                    </td>
                    <td className="td">
                      <strong style={{ color: "var(--success)" }}>{order.amount}</strong>
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
                    <td className="td">{order.date}</td>
                    <td className="td">
                      <button type="button" className="view-btn">👁️ Xem</button>
                      {order.status !== "Hoàn thành" && (
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="status-select"
                        >
                          <option>Chờ xác nhận</option>
                          <option>Đang xử lý</option>
                          <option>Đang giao</option>
                          <option>Hoàn thành</option>
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

