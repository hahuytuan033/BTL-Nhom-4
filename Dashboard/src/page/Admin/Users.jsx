import AdminLayout from "../../component/Adminlayout";
import { useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0901234567",
      role: "Khách hàng",
      status: "Hoạt động",
      joinDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@example.com",
      phone: "0901234568",
      role: "Khách hàng VIP",
      status: "Hoạt động",
      joinDate: "2024-02-20"
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@example.com",
      phone: "0901234569",
      role: "Khách hàng",
      status: "Không hoạt động",
      joinDate: "2024-03-10"
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@example.com",
      phone: "0901234570",
      role: "Quản lý",
      status: "Hoạt động",
      joinDate: "2023-12-05"
    },
    {
      id: 5,
      name: "Đặng Văn E",
      email: "dangvane@example.com",
      phone: "0901234571",
      role: "Khách hàng",
      status: "Hoạt động",
      joinDate: "2024-04-22"
    }
  ]);

  const [selectedRole, setSelectedRole] = useState("Tất cả");
  const roles = ["Tất cả", "Khách hàng", "Khách hàng VIP", "Quản lý"];

  const filteredUsers = selectedRole === "Tất cả"
    ? users
    : users.filter(user => user.role === selectedRole);

  const handleStatusChange = (userId) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === "Hoạt động" ? "Không hoạt động" : "Hoạt động" }
        : user
    ));
  };

  return (
    <AdminLayout>
      <div className="page-container">
        <div className="section-header">
          <h1 className="section-title">Quản Lý Người Dùng</h1>
        </div>

        <div className="filter-section">
          {roles.map((role) => (
            <button
              key={role}
              type="button"
              className={`filter-btn${selectedRole === role ? " active" : ""}`}
              onClick={() => setSelectedRole(role)}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="th">ID</th>
                  <th className="th">Họ Tên</th>
                  <th className="th">Email</th>
                  <th className="th">Điện Thoại</th>
                  <th className="th">Vai Trò</th>
                  <th className="th">Trạng Thái</th>
                  <th className="th">Ngày Tham Gia</th>
                  <th className="th">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="table-row">
                    <td className="td">{user.id}</td>
                    <td className="td">
                      <div className="user-info">
                        <div className="user-avatar">{user.name.charAt(0)}</div>
                        <strong>{user.name}</strong>
                      </div>
                    </td>
                    <td className="td">
                      <span className="email">{user.email}</span>
                    </td>
                    <td className="td">{user.phone}</td>
                    <td className="td">
                      <span
                        className="role-badge"
                        style={{
                          backgroundColor: user.role === "Quản lý" ? "#EDE9FE" : "#DBEAFE",
                          color: user.role === "Quản lý" ? "#7C3AED" : "#0284C7"
                        }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="td">
                      <span
                        className="status-badge"
                        style={{
                          backgroundColor: user.status === "Hoạt động" ? "#DCFCE7" : "#FEE2E2",
                          color: user.status === "Hoạt động" ? "#15803D" : "#991B1B"
                        }}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="td">{user.joinDate}</td>
                    <td className="td">
                      <button type="button" className="edit-btn">✏️ Sửa</button>
                      <button
                        type="button"
                        className="status-btn"
                        style={{ backgroundColor: user.status === "Hoạt động" ? "#EF4444" : "#10B981" }}
                        onClick={() => handleStatusChange(user.id)}
                      >
                        {user.status === "Hoạt động" ? "🔒 Khóa" : "🔓 Mở"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-number">{users.length}</div>
            <div className="stat-label">Tổng Người Dùng</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{users.filter(u => u.status === "Hoạt động").length}</div>
            <div className="stat-label">Hoạt Động</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{users.filter(u => u.role === "Khách hàng VIP").length}</div>
            <div className="stat-label">Khách Hàng VIP</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{users.filter(u => u.role === "Quản lý").length}</div>
            <div className="stat-label">Quản Lý</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

