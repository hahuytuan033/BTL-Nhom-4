import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
        email,
        password
      });

      const { fullName, email: adminEmail, role, token } = response.data;

      if (role !== "admin") {
        setError("Tài khoản không có quyền truy cập trang quản trị!");
        return;
      }

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("adminName", fullName);
      localStorage.setItem("adminEmail", adminEmail);
      localStorage.setItem("adminToken", token);

      navigate("/");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Đăng nhập thất bại. Vui lòng kiểm tra thông tin hoặc kết nối!");
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6' }}>
      <form onSubmit={handleLogin} style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '300px' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Đăng Nhập Quản Trị</h2>
        {error && <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}
        <div style={{ marginBottom: '15px' }}>
          <label>Email đăng nhập</label>
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Mật khẩu</label>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="save-btn" style={{ width: '100%', padding: '10px' }}>Đăng Nhập</button>
      </form>
    </div>
  );
}

