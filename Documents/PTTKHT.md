# TÀI LIỆU PHÂN TÍCH & THIẾT KẾ HỆ THỐNG CHI TIẾT
## Trang Thương Mại Điện Tử Bán Giày Online

> **Mục tiêu:** Xây dựng nền tảng thương mại điện tử chuyên nghiệp giúp khách hàng tối ưu việc tìm kiếm, chọn size, mẫu giày và đặt hàng, đồng thời cung cấp hệ thống quản trị tập trung để kiểm soát tồn kho, danh mục sản phẩm và vận hành đơn hàng hiệu quả.

---

## 1. PHÂN TÍCH YÊU CẦU HỆ THỐNG

### 1.1 Tác Nhân (Actors)

| Tác Nhân | Mô Tả |
|---|---|
| **Khách vãng lai (Guest)** | Người dùng chưa đăng nhập, có thể xem sản phẩm, tìm kiếm |
| **Khách hàng (User)** | Người dùng đã đăng ký, có thể đặt hàng, xem lịch sử mua |
| **Admin** | Quản trị viên, toàn quyền quản lý hệ thống |

### 1.2 Use Case

#### 👤 Khách vãng lai (Guest)
- Xem trang chủ & banner
- Duyệt danh mục sản phẩm
- Tìm kiếm sản phẩm cơ bản
- Xem chi tiết sản phẩm
- Đăng ký tài khoản

#### 👤 Khách hàng (User)
- Đăng nhập / Đăng xuất
- Quản lý thông tin cá nhân
- Thêm sản phẩm vào giỏ hàng
- Đặt hàng & thanh toán khi nhận hàng (COD)
- Xem lịch sử mua hàng

#### 🛠️ Admin
- Quản lý sản phẩm (Thêm / sửa / xóa / ẩn)
- Quản lý danh mục
- Quản lý đơn hàng (xác nhận, cập nhật trạng thái)
- Quản lý người dùng
- Xem thống kê cơ bản

### 1.3 Yêu Cầu Chức Năng

| Mã | Tính Năng | Mức Độ Ưu Tiên |
|---|---|---|
| F01 | Đăng ký tài khoản cơ bản | Cao |
| F02 | Đăng nhập / Đăng xuất (JWT) | Cao |
| F03 | Xem danh sách & tìm kiếm sản phẩm | Cao |
| F04 | Xem chi tiết sản phẩm | Cao |
| F05 | Quản lý giỏ hàng (thêm/sửa/xóa) | Cao |
| F06 | Đặt hàng với phương thức thanh toán COD | Cao |
| F07 | Theo dõi trạng thái đơn & Lịch sử mua hàng | Cao |
| F08 | Admin: Quản lý sản phẩm (CRUD) | Cao |
| F09 | Admin: Quản lý đơn hàng & trạng thái | Cao |
| F10 | Admin: Thống kê doanh thu cơ bản | Trung bình |

### 1.4 Yêu Cầu Phi Chức Năng

| Tiêu Chí | Mô Tả |
|---|---|
| **Bảo mật** | Mã hóa mật khẩu bcrypt, JWT access token |
| **Giao diện** | Responsive, thân thiện với người dùng |
| **Hiệu năng** | Tốc độ phản hồi cơ bản tốt |

---

## 2. THIẾT KẾ HỆ THỐNG

### 2.1 Kiến Trúc Tổng Thể

```
┌─────────────────────────────────────────────┐
│              CLIENT LAYER                   │
│         React.js + Vite (SPA)               │
│   (Trang khách hàng + Trang Admin)          │
└─────────────────┬───────────────────────────┘
                  │ HTTP/HTTPS (REST API)
┌─────────────────▼───────────────────────────┐
│              SERVER LAYER                   │
│            Node.js + Socket.io              │
│  ┌──────────┐ ┌──────────┐ ┌─────────────┐  │
│  │Auth Svc  │ │Product   │ │ Order Svc   │  │
│  │          │ │Svc       │ │             │  │
│  └──────────┘ └──────────┘ └─────────────┘  │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│             DATA LAYER                      │
│  ┌──────────────┐     ┌───────────────────┐ │
│  │   MongoDB    │     │  Cloudinary (CDN) │ │
│  │  (Database)  │     │  (Image Storage)  │ │
│  └──────────────┘     └───────────────────┘ │
└─────────────────────────────────────────────┘
```

### 2.2 Công Nghệ Sử Dụng

| Tầng | Công Nghệ | Mục Đích |
|---|---|---|
| **Frontend** | React.js, Vite | Giao diện SPA tốc độ cao |
| **Styling** | CSS Modules / Tailwind CSS | Giao diện responsive |
| **Backend** | Node.js, Socket.io  | REST API server |
| **Database** | MongoDB + Mongoose | Lưu trữ dữ liệu |
| **Xác thực** | JWT (Access Token) | Bảo mật API |
| **Ảnh** | Cloudinary | Lưu trữ ảnh sản phẩm |



## 3. THIẾT KẾ GIAO DIỆN

### 3.1 Cấu Trúc Trang (Sitemap)

```
/                        → Trang chủ
├── /products            → Danh sách sản phẩm
├── /products/:id        → Chi tiết sản phẩm
├── /cart                → Giỏ hàng
├── /checkout            → Thanh toán (COD)
├── /auth
│   ├── /login           → Đăng nhập
│   └── /register        → Đăng ký
├── /profile             → Thông tin cá nhân & Lịch sử mua hàng
└── /admin               → Trang quản trị
    ├── /dashboard       → Tổng quan
    ├── /products        → Quản lý sản phẩm
    ├── /orders          → Quản lý đơn hàng
    └── /categories      → Quản lý danh mục
```

### 3.2 Mô Tả Các Trang Chính

| Trang | Thành Phần Chính |
|---|---|
| **Trang chủ** | Banner, danh mục nổi bật, sản phẩm mới |
| **Danh sách sản phẩm** | Lọc cơ bản (danh mục), danh sách card sản phẩm |
| **Chi tiết sản phẩm** | Ảnh, chọn size, nút thêm giỏ, mô tả |
| **Giỏ hàng & Thanh toán** | Xem sản phẩm đã chọn, điền địa chỉ, đặt hàng COD |
| **Admin Dashboard** | Thống kê cơ bản, danh sách đơn hàng mới |

---



## 4. SƠ ĐỒ QUAN HỆ THỰC THỂ (ERD)

### 4.1 Quan Hệ Giữa Các Collection

```
users ──────────────< orders           (1 user có nhiều đơn hàng)
users ──────────────< reviews          (1 user có nhiều đánh giá)
users >─────────────> products         (wishlist: nhiều-nhiều)

products >──────────── categories      (nhiều sản phẩm thuộc 1 danh mục)
products >──────────── brands          (nhiều sản phẩm thuộc 1 thương hiệu)
products ──────────────< reviews       (1 sản phẩm có nhiều đánh giá)

orders ──────────────< order_items     (1 đơn hàng có nhiều sản phẩm)
orders >──────────── vouchers          (nhiều đơn hàng dùng 1 voucher)

reviews >──────────── products         (mỗi đánh giá thuộc 1 sản phẩm)
reviews >──────────── users            (mỗi đánh giá do 1 user viết)
reviews >──────────── orders           (chỉ đánh giá được sản phẩm đã mua)
```

### 4.2 Ràng Buộc Nghiệp Vụ Quan Trọng

| Ràng Buộc | Mô Tả |
|---|---|
| Hủy đơn hàng | Khách hàng chỉ hủy được khi trạng thái là `pending` |
| Xóa sản phẩm | Admin chỉ ẩn (`isActive: false`), không xóa cứng để bảo toàn lịch sử đơn hàng |

---


