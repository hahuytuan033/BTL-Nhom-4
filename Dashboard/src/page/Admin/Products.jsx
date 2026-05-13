import AdminLayout from "../../component/Adminlayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Giày Thể Thao Nike Air Max",
      category: "Giày Thể Thao",
      price: "2.5M",
      stock: 45,
      status: "Có sẵn"
    },
    {
      id: 2,
      name: "Giày Sneaker Adidas Superstar",
      category: "Giày Sneaker",
      price: "2.1M",
      stock: 32,
      status: "Có sẵn"
    },
    {
      id: 3,
      name: "Giày Da Nam Classic",
      category: "Giày Da",
      price: "1.8M",
      stock: 18,
      status: "Có sẵn"
    },
    {
      id: 4,
      name: "Giày Chạy Bộ New Balance",
      category: "Giày Chạy Bộ",
      price: "2.9M",
      stock: 2,
      status: "Sắp hết"
    },
    {
      id: 5,
      name: "Giày Sandal Nữ Đế Bệt",
      category: "Sandal",
      price: "850K",
      stock: 56,
      status: "Có sẵn"
    }
  ]);

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

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
                  <th className="th">ID</th>
                  <th className="th">Tên Sản Phẩm</th>
                  <th className="th">Danh Mục</th>
                  <th className="th">Giá</th>
                  <th className="th">Kho</th>
                  <th className="th">Trạng Thái</th>
                  <th className="th">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="table-row">
                    <td className="td">{product.id}</td>
                    <td className="td">
                      <strong>{product.name}</strong>
                    </td>
                    <td className="td">{product.category}</td>
                    <td className="td">
                      <span className="summary-value" style={{ color: "var(--success)" }}>
                        {product.price}
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
                        onClick={() => handleDeleteProduct(product.id)}
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

