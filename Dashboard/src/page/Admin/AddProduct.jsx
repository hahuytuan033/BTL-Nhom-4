import AdminLayout from "../../component/Adminlayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    stock: ""
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Sử dụng FormData để gửi cả file ảnh và text
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("brand", product.brand);
    formData.append("category", product.category);
    formData.append("description", product.description);
    formData.append("price", Number(product.price));
    formData.append("stock", Number(product.stock) || 0);
    formData.append("status", Number(product.stock) > 0 ? 'Có sẵn' : 'Hết hàng');
    
    if (file) {
      formData.append("image", file);
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Thêm sản phẩm thành công!");
      navigate('/products');
    } catch (error) {
      alert("Lỗi khi thêm sản phẩm");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="page-container">
        <div className="section-header">
          <h1 className="section-title">Thêm Sản Phẩm Mới</h1>
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="info-label" htmlFor="name">Tên sản phẩm</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ví dụ: Nike Air Force 1"
                  value={product.name}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="info-label" htmlFor="brand">Thương hiệu</label>
                <input
                  id="brand"
                  name="brand"
                  type="text"
                  placeholder="Ví dụ: Nike"
                  value={product.brand}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="info-label" htmlFor="price">Giá (VNĐ)</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Ví dụ: 3200000"
                  value={product.price}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="info-label" htmlFor="stock">Số lượng trong kho</label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  placeholder="Ví dụ: 50"
                  value={product.stock}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="info-label" htmlFor="category">Danh mục</label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  placeholder="Ví dụ: Giày Sneaker"
                  value={product.category}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '16px' }}>
              <label className="info-label" htmlFor="description">Mô tả sản phẩm</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                placeholder="Mô tả chi tiết về sản phẩm..."
                value={product.description}
                onChange={handleChange}
                className="input"
              ></textarea>
            </div>

            <div className="form-group" style={{ marginTop: '16px' }}>
              <label className="info-label" htmlFor="image">Hình ảnh sản phẩm (Tùy chọn)</label>
              <input
                id="image"
                name="image"
                type="file"
                onChange={handleFileChange}
                className="input"
                accept="image/*"
              />
            </div>
            
            <div className="button-group" style={{ marginTop: '24px' }}>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Đang lưu...' : 'Lưu Sản Phẩm'}
              </button>
              <button type="button" className="cancel-btn" onClick={() => navigate('/products')}>
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
