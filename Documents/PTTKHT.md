# TÀI LIỆU PHÂN TÍCH & THIẾT KẾ HỆ THỐNG CHI TIẾT
## Trang Thương Mại Điện Tử Bán Giày Online (BTL Nhóm 4)

> **Mục tiêu:** Xây dựng nền tảng thương mại điện tử chuyên nghiệp giúp khách hàng tối ưu việc tìm kiếm, chọn mẫu giày và đặt hàng, đồng thời cung cấp hệ thống quản trị (Admin Dashboard) tập trung để kiểm soát tồn kho, sản phẩm, đơn hàng và người dùng hiệu quả.

---

## 1. PHÂN TÍCH YÊU CẦU HỆ THỐNG

### 1.1 Tác Nhân (Actors)

| Tác Nhân | Mô Tả |
|---|---|
| **Khách vãng lai (Guest)** | Người dùng chưa đăng nhập, có thể xem sản phẩm, tìm kiếm cơ bản. |
| **Khách hàng (User)** | Người dùng đã đăng ký/đăng nhập, có thể quản lý hồ sơ, yêu thích sản phẩm, xem lịch sử đơn hàng. |
| **Quản trị viên (Admin)** | Người điều hành hệ thống, có quyền quản lý sản phẩm, đơn hàng, người dùng và xem báo cáo thống kê. |

### 1.2 Use Case

#### 👤 Khách vãng lai & Khách hàng
- **Xem sản phẩm:** Trang chủ hiển thị Hero Section, Categories, và các danh sách sản phẩm (Đề xuất, Hàng mới).
- **Tìm kiếm & Lọc:** Tìm kiếm sản phẩm qua thanh search, xem theo danh mục (Sneakers, Streetwear, v.v.).
- **Đăng ký / Đăng nhập:** Hệ thống đăng ký tài khoản (yêu cầu Gmail) và đăng nhập JWT.
- **Quản lý hồ sơ (User Profile):** Cập nhật thông tin cá nhân, địa chỉ giao hàng, tùy chọn kích thước (shoe size, apparel size).
- **Yêu thích (Wishlist):** Lưu các sản phẩm yêu thích vào danh sách riêng.
- **Lịch sử mua hàng:** Theo dõi các đơn hàng đã đặt và trạng thái của chúng.

#### 🛠️ Quản trị viên (Admin Dashboard)
- **Tổng quan (Dashboard):** Xem thống kê nhanh về tổng sản phẩm, đơn hàng, khách hàng và doanh thu. Theo dõi đơn hàng mới và sản phẩm sắp hết hàng.
- **Quản lý sản phẩm:** Xem danh sách, thêm sản phẩm mới (hỗ trợ upload ảnh lên Cloudinary), và xóa sản phẩm.
- **Quản lý đơn hàng:** Theo dõi danh sách đơn hàng, cập nhật trạng thái đơn hàng (Chờ xác nhận, Đang xử lý, Đang giao, Hoàn thành).
- **Quản lý người dùng:** Xem danh sách khách hàng, thay đổi trạng thái hoạt động (Khóa/Mở khóa tài khoản).
- **Báo cáo & Thống kê:** Biểu đồ doanh thu 6 tháng gần nhất và các chỉ số kinh doanh chính.
- **Cài đặt hệ thống:** Cấu hình thông tin trang web, thông báo và bảo mật.

### 1.3 Yêu Cầu Chức Năng Chính

| Mã | Tính Năng | Tác Nhân |
|---|---|---|
| F01 | Đăng ký/Đăng nhập & Xác thực JWT | User/Admin |
| F02 | Hiển thị sản phẩm đa dạng (Hero, Categories, Sections) | Guest/User |
| F03 | Quản lý Hồ sơ người dùng chi tiết (Địa chỉ, Size) | User |
| F04 | Quản lý danh sách yêu thích (Wishlist) | User |
| F05 | Xem lịch sử và trạng thái đơn hàng | User |
| F06 | Admin: Dashboard thống kê thời gian thực | Admin |
| F07 | Admin: Quản lý sản phẩm & Upload ảnh Cloudinary | Admin |
| F08 | Admin: Quản lý & Cập nhật trạng thái đơn hàng | Admin |
| F09 | Admin: Quản lý & Khóa/Mở người dùng | Admin |
| F10 | Admin: Báo cáo doanh thu & Thống kê chi tiết | Admin |

---

## 2. THIẾT KẾ KIẾN TRÚC & CÔNG NGHỆ

### 2.1 Kiến Trúc Tổng Thể (MERN Stack)

```
┌─────────────────────────────────────────────────────────────┐
│                       PRESENTATION LAYER                    │
│  ┌──────────────────────────────┐  ┌─────────────────────┐  │
│  │    Customer Storefront       │  │   Admin Dashboard   │  │
│  │    (React + Tailwind CSS)    │  │   (React + CSS)     │  │
└───────────────────────┬────────────────────────────┬────────┘
                        │                            │
                  HTTP / REST API              HTTP / REST API
                        │                            │
┌───────────────────────▼────────────────────────────▼────────┐
│                        BACKEND LAYER                        │
│             Node.js + Express.js + Socket.io                │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │ User Controller│  │Prod Controller│  │ Order Controller  │  │
│  └──────────────┘  └──────────────┘  └───────────────────┘  │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                        DATABASE LAYER                       │
│        ┌──────────────────┐        ┌──────────────────┐     │
│        │     MongoDB      │        │   Cloudinary     │     │
│        │   (Database)     │        │ (Image Hosting)  │     │
│        └──────────────────┘        └──────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Công Nghệ Sử Dụng

- **Frontend (Khách hàng):** React.js, Tailwind CSS, Lucide React (Icons).
- **Frontend (Admin):** React.js, Custom CSS, Axios.
- **Backend:** Node.js, Express.js, Socket.io (Hỗ trợ thông báo thời gian thực).
- **Database:** MongoDB Atlas (Mongoose ODM).
- **Cloud Storage:** Cloudinary (Lưu trữ ảnh sản phẩm).
- **Authentication:** JSON Web Token (JWT), Bcrypt.js (Mã hóa mật khẩu).

---

## 3. THIẾT KẾ CƠ SỞ DỮ LIỆU (ERD)

### 3.1 Các Collection Chính

- **Users:** `fullName`, `email`, `password`, `role` (user/admin), `status` (active/inactive), `wishlist` (ref: Product).
- **Products:** `name`, `brand`, `category`, `price`, `stock`, `status` (Có sẵn/Sắp hết/Hết hàng), `description`, `image`.
- **Orders:** `orderNumber`, `customer`, `userEmail`, `amount`, `status` (Chờ xác nhận/Đang xử lý/Đang giao/Hoàn thành), `items`, `createdAt`.

---

## 4. THIẾT KẾ GIAO DIỆN (SITEMAP)

### 4.1 Phân hệ Khách hàng
- `/` : Trang chủ (Hero, Categories, Recommended Products, New Arrivals).
- `Login/Register Modal`: Đăng nhập & Đăng ký (yêu cầu @gmail.com).
- `User Profile Modal`: Quản lý Profile, Buying, Wishlist, Settings.

### 4.2 Phân hệ Admin Dashboard
- `/login` : Đăng nhập quản trị.
- `/` : Dashboard tổng quan.
- `/products` : Danh sách sản phẩm.
- `/add-product` : Thêm sản phẩm mới.
- `/orders` : Quản lý đơn hàng.
- `/users` : Quản lý khách hàng.
- `/reports` : Báo cáo & Thống kê.
- `/settings` : Cài đặt hệ thống.
