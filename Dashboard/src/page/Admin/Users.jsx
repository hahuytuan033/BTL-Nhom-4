import AdminLayout from "../../component/Adminlayout";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải dữ liệu người dùng');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const [selectedRole, setSelectedRole] = useState("Tất cả");
  const roles = ["Tất cả", "user", "admin"];

  const filteredUsers = selectedRole === "Tất cả"
    ? users
    : users.filter(user => user.role === selectedRole);

  const handleStatusChange = async (userId) => {
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/users/${userId}/status`);
      setUsers(users.map(user => user._id === userId ? data : user));
    } catch (err) {
      alert("Lỗi khi cập nhật trạng thái");
    }
  };

  if (loading) return <AdminLayout><div className="page-container">Đang tải...</div></AdminLayout>;
  if (error) return <AdminLayout><div className="page-container">{error}</div></AdminLayout>;

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
              {role === 'user' ? 'Khách hàng' : role === 'admin' ? 'Quản lý' : 'Tất cả'}
            </button>
          ))}
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="th">Họ Tên</th>
                  <th className="th">Email</th>
                  <th className="th">Vai Trò</th>
                  <th className="th">Trạng Thái</th>
                  <th className="th">Ngày Tham Gia</th>
                  <th className="th">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="table-row">
                    <td className="td">
                      <div className="user-info">
                        <div className="user-avatar">{user.fullName ? user.fullName.charAt(0) : 'U'}</div>
                        <strong>{user.fullName}</strong>
                      </div>
                    </td>
                    <td className="td">
                      <span className="email">{user.email}</span>
                    </td>
                    <td className="td">
                      <span
                        className="role-badge"
                        style={{
                          backgroundColor: user.role === "admin" ? "#EDE9FE" : "#DBEAFE",
                          color: user.role === "admin" ? "#7C3AED" : "#0284C7"
                        }}
                      >
                        {user.role === 'admin' ? 'Quản lý' : 'Khách hàng'}
                      </span>
                    </td>
                    <td className="td">
                      <span
                        className="status-badge"
                        style={{
                          backgroundColor: user.status === "active" ? "#DCFCE7" : "#FEE2E2",
                          color: user.status === "active" ? "#15803D" : "#991B1B"
                        }}
                      >
                        {user.status === 'active' ? 'Hoạt động' : 'Khóa'}
                      </span>
                    </td>
                    <td className="td">{new Date(user.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td className="td">
                      <button
                        type="button"
                        className="status-btn"
                        style={{ backgroundColor: user.status === "active" ? "#EF4444" : "#10B981" }}
                        onClick={() => handleStatusChange(user._id)}
                      >
                        {user.status === "active" ? "🔒 Khóa" : "🔓 Mở"}
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
            <div className="stat-number">{users.filter(u => u.status === "active").length}</div>
            <div className="stat-label">Hoạt Động</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{users.filter(u => u.role === "user").length}</div>
            <div className="stat-label">Khách Hàng</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{users.filter(u => u.role === "admin").length}</div>
            <div className="stat-label">Quản Lý</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

