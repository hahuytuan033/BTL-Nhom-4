import AdminLayout from "../../component/Adminlayout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải dữ liệu sản phẩm');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`);
        setProducts(products.filter(p => p._id !== id));
      } catch (err) {
        alert("Lỗi khi xóa sản phẩm");
      }
    }
  };

  if (loading) return <AdminLayout><div className="page-container">Đang tải...</div></AdminLayout>;
  if (error) return <AdminLayout><div className="page-container">{error}</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="page-container">
        <div className="section-header">
          <div>
            <h1 className="section-title">Quản Lý Sản Phẩm</h1>
          </div>
          <button className="add-btn" onClick={() => navigate('/add-product')}>
            ➕ Thêm Sản Phẩm
          </button>
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="th">Sản Phẩm</th>
                  <th className="th">Danh Mục</th>
                  <th className="th">Giá</th>
                  <th className="th">Kho</th>
                  <th className="th">Trạng Thái</th>
                  <th className="th">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="table-row">
                    <td className="td">
                      <strong>{product.name}</strong><br/>
                      <small style={{color: '#6b7280'}}>{product.brand}</small>
                    </td>
                    <td className="td">{product.category}</td>
                    <td className="td">
                      <span className="summary-value" style={{ color: "var(--success)" }}>
                        {product.price.toLocaleString('vi-VN')} đ
                      </span>
                    </td>
                    <td className="td">{product.stock}</td>
                    <td className="td">
                      <span
                        className="badge"
                        style={{
                          backgroundColor: product.stock > 10 ? "var(--success)" : "var(--warning)",
                          color: "#fff"
                        }}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="td">
                      <button type="button" className="edit-btn">✏️ Sửa</button>
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        🗑️ Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="summary-label" style={{ marginTop: "20px", textAlign: "center" }}>
          Tổng cộng: {products.length} sản phẩm
        </p>
      </div>
    </AdminLayout>
  );
}
