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
│            Node.js + Express.js             │
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
| **Backend** | Node.js, Express.js | REST API server |
| **Database** | MongoDB + Mongoose | Lưu trữ dữ liệu |
| **Xác thực** | JWT (Access Token) | Bảo mật API |
| **Ảnh** | Cloudinary | Lưu trữ ảnh sản phẩm |

---

## 3. THIẾT KẾ CƠ SỞ DỮ LIỆU

### 3.1 Collection: `users`
```json
{
  "_id": "ObjectId",
  "name": "String (required)",
  "email": "String (unique, required)",
  "password": "String (hashed, bcrypt)",
  "phone": "String",
  "role": "String (enum: ['user', 'admin'], default: 'user')",
  "address": "String",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### 3.2 Collection: `categories`
```json
{
  "_id": "ObjectId",
  "name": "String (required)",
  "slug": "String (unique)",
  "isActive": "Boolean (default: true)"
}
```

### 3.3 Collection: `products`
```json
{
  "_id": "ObjectId",
  "name": "String (required)",
  "description": "String",
  "category": "ObjectId (ref: categories)",
  "price": "Number (required)",
  "images": ["String (URL)"],
  "sizes": ["Number (e.g: 39, 40, 41, 42, 43)"],
  "stock": "Number (default: 0)",
  "isActive": "Boolean (default: true)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### 3.4 Collection: `orders`
```json
{
  "_id": "ObjectId",
  "orderCode": "String (unique)",
  "user": "ObjectId (ref: users)",
  "items": [
    {
      "product": "ObjectId (ref: products)",
      "productName": "String",
      "size": "Number",
      "quantity": "Number",
      "price": "Number"
    }
  ],
  "shippingAddress": "String",
  "phone": "String",
  "totalAmount": "Number",
  "paymentMethod": "String (default: 'COD')",
  "orderStatus": "String (enum: ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'], default: 'pending')",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## 4. THIẾT KẾ API

### 4.1 Auth API

| Method | Endpoint | Mô Tả | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Đăng ký tài khoản | ❌ |
| POST | `/api/auth/login` | Đăng nhập | ❌ |
| GET | `/api/auth/me` | Lấy thông tin user hiện tại | ✅ User |

### 4.2 User & Cart API

| Method | Endpoint | Mô Tả | Auth |
|---|---|---|---|
| PUT | `/api/users/profile` | Cập nhật thông tin cơ bản | ✅ User |
| GET | `/api/cart` | Xem giỏ hàng | ✅ User |
| POST | `/api/cart` | Thêm sản phẩm vào giỏ | ✅ User |
| DELETE | `/api/cart/:itemId` | Xóa sản phẩm khỏi giỏ | ✅ User |
| DELETE | `/api/cart` | Xóa toàn bộ giỏ hàng | ✅ User |

### 4.3 Product API

| Method | Endpoint | Mô Tả | Auth |
|---|---|---|---|
| GET | `/api/products` | Danh sách sản phẩm | ❌ |
| GET | `/api/products/:id` | Chi tiết sản phẩm | ❌ |
| POST | `/api/admin/products` | Thêm sản phẩm | ✅ Admin |
| PUT | `/api/admin/products/:id` | Sửa sản phẩm | ✅ Admin |
| DELETE | `/api/admin/products/:id` | Xóa / ẩn sản phẩm | ✅ Admin |

### 4.4 Order API

| Method | Endpoint | Mô Tả | Auth |
|---|---|---|---|
| POST | `/api/orders` | Tạo đơn hàng | ✅ User |
| GET | `/api/orders` | Lịch sử đơn hàng của user | ✅ User |
| PUT | `/api/orders/:id/cancel` | Hủy đơn hàng | ✅ User |
| GET | `/api/admin/orders` | Tất cả đơn hàng (admin) | ✅ Admin |
| PUT | `/api/admin/orders/:id/status` | Cập nhật trạng thái đơn | ✅ Admin |

---

## 5. THIẾT KẾ GIAO DIỆN

### 5.1 Cấu Trúc Trang (Sitemap)

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

### 5.2 Mô Tả Các Trang Chính

| Trang | Thành Phần Chính |
|---|---|
| **Trang chủ** | Banner, danh mục nổi bật, sản phẩm mới |
| **Danh sách sản phẩm** | Lọc cơ bản (danh mục), danh sách card sản phẩm |
| **Chi tiết sản phẩm** | Ảnh, chọn size, nút thêm giỏ, mô tả |
| **Giỏ hàng & Thanh toán** | Xem sản phẩm đã chọn, điền địa chỉ, đặt hàng COD |
| **Admin Dashboard** | Thống kê cơ bản, danh sách đơn hàng mới |

---

## 6. BẢO MẬT HỆ THỐNG

### 6.1 Xác Thực & Phân Quyền

- **JWT Access Token**: Lưu ở Client (LocalStorage hoặc Cookie)
- **Phân quyền**: Middleware kiểm tra role (`user`, `admin`) trên mỗi route
- **Mã hóa mật khẩu**: bcrypt

### 6.2 Bảo Mật Cơ Bản

- CORS: Chỉ cho phép domain frontend được cấu hình
- Validate input: Kiểm tra dữ liệu đầu vào cơ bản

---

## 7. QUY TRÌNH NGHIỆP VỤ (Business Flow)

### 7.1 Luồng Đặt Hàng Cơ Bản

```
Khách hàng chọn sản phẩm (kèm size)
        ↓
Thêm vào giỏ hàng
        ↓
Xem giỏ hàng & Nhập địa chỉ giao hàng
        ↓
Xác nhận đặt hàng (Thanh toán khi nhận hàng - COD)
        ↓
Đơn hàng ở trạng thái "Chờ xác nhận" (pending)
        ↓
Admin xác nhận → Đang giao (shipping) → Hoàn thành (delivered)
```

### 7.2 Trạng Thái Đơn Hàng

```
pending → confirmed → shipping → delivered
                   ↘
                 cancelled
```

---

## 8. KẾ HOẠCH TRIỂN KHAI

### 8.1 Phân Chia Công Việc

| Giai Đoạn | Công Việc | Thời Gian Dự Kiến |
|---|---|---|
| **Tuần 1-2** | Phân tích CSDL, thiết kế giao diện UI/UX (HTML/CSS/React) | 2 Tuần |
| **Tuần 3-4** | Xây dựng API Backend cơ bản (Auth, Products, Categories) | 2 Tuần |
| **Tuần 5-6** | Ghép API vào Frontend, hoàn thiện giỏ hàng & đặt hàng | 2 Tuần |
| **Tuần 7-8** | Hoàn thiện trang Admin, kiểm thử và sửa lỗi (Bug fix) | 2 Tuần |

### 8.2 Cấu Trúc Thư Mục Dự Án

```
BTL-Nhom-4/
├── client/                  # React frontend
│   ├── src/
│   │   ├── pages/           # Các trang chính
│   │   ├── components/      # Components tái sử dụng
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API calls
│   │   ├── store/           # State management (Redux/Zustand)
│   │   └── utils/           # Helper functions
│   └── public/
├── server/                  # Node.js backend
│   ├── src/
│   │   ├── controllers/     # Xử lý logic request
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # Định nghĩa API routes
│   │   ├── middlewares/     # Auth, validation, error handling
│   │   ├── services/        # Business logic
│   │   └── utils/           # Helper functions
│   └── config/
└── Documents/               # Tài liệu dự án
```

---

## 9. SƠ ĐỒ QUAN HỆ THỰC THỂ (ERD)

### 9.1 Quan Hệ Giữa Các Collection

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

### 9.2 Ràng Buộc Nghiệp Vụ Quan Trọng

| Ràng Buộc | Mô Tả |
|---|---|
| Hủy đơn hàng | Khách hàng chỉ hủy được khi trạng thái là `pending` |
| Xóa sản phẩm | Admin chỉ ẩn (`isActive: false`), không xóa cứng để bảo toàn lịch sử đơn hàng |

---

## 10. LUỒNG XÁC THỰC CƠ BẢN

### 10.1 Đăng Ký & Đăng Nhập

```
[ĐĂNG KÝ]
Client gửi { name, email, password } → Server hash password → Lưu vào DB → Thành công

[ĐĂNG NHẬP]
Client gửi POST /api/auth/login { email, password } 
        ↓
Server kiểm tra email & so sánh password
        ↓
Tạo JWT Access Token 
        ↓
Trả về Token cho Client lưu lại (LocalStorage/Cookie)
```

### 10.2 Phân Quyền Đơn Giản

```javascript
// Các mức quyền
guest  : Không cần token (xem sản phẩm, tìm kiếm)
user   : Cần token hợp lệ (giỏ hàng, đặt hàng)
admin  : Cần token + role = 'admin' (toàn quyền)
```

---

## 11. XỬ LÝ LỖI & RESPONSE CHUẨN

### 11.1 Cấu Trúc Response API

```json
// Thành công
{
  "success": true,
  "message": "Mô tả kết quả",
  "data": { ... }
}

// Thất bại
{
  "success": false,
  "message": "Mô tả lỗi",
  "errors": [ ... ]   // (tuỳ chọn, dùng khi validate form)
}
```

### 11.2 Bảng Mã Lỗi HTTP

| HTTP Code | Tình Huống |
|---|---|
| 200 | Thành công |
| 201 | Tạo mới thành công |
| 400 | Dữ liệu đầu vào không hợp lệ |
| 401 | Chưa xác thực (token thiếu / hết hạn) |
| 403 | Không đủ quyền truy cập |
| 404 | Không tìm thấy tài nguyên |
| 500 | Lỗi máy chủ nội bộ |

---

## 12. KIỂM THỬ CƠ BẢN (Test Plan)

### 12.1 Các Loại Kiểm Thử

| Loại | Công Cụ | Phạm Vi |
|---|---|---|
| **Manual Test** | Postman | Toàn bộ API |
| **UI Test** | Kiểm tra tay | Luồng mua hàng end-to-end trên trình duyệt |

### 12.2 Các Test Case Quan Trọng

| ID | Kịch Bản | Kết Quả Mong Đợi |
|---|---|---|
| TC01 | Đăng ký với email đã tồn tại | Báo lỗi "Email đã được sử dụng" |
| TC02 | Đăng nhập sai mật khẩu | Báo lỗi "Sai mật khẩu hoặc email" |
| TC03 | Thêm sản phẩm vào giỏ khi chưa đăng nhập | Yêu cầu đăng nhập |
| TC04 | Đặt hàng thành công | Đơn hàng trạng thái `pending`, làm trống giỏ hàng |
| TC05 | Hủy đơn hàng đang giao | Báo lỗi "Không thể hủy đơn đang giao" |
| TC06 | Truy cập trang Admin bằng tài khoản User | Báo lỗi 403 (Không đủ quyền) |

---

## 13. CẤU HÌNH MÔI TRƯỜNG

### 13.1 Biến Môi Trường Server (`.env`)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/shoeshop

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary (Image Storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL (CORS)
CLIENT_URL=http://localhost:5173
```

### 13.2 Biến Môi Trường Client (`.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 14. HƯỚNG DẪN KHỞI CHẠY DỰ ÁN

### 14.1 Yêu Cầu Hệ Thống

| Công Cụ | Phiên Bản Tối Thiểu |
|---|---|
| Node.js | ≥ 18.x |
| npm | ≥ 9.x |
| MongoDB | ≥ 6.x (hoặc dùng Atlas) |
| Git | Phiên bản mới nhất |

### 14.2 Các Bước Cài Đặt

```bash
# 1. Clone repository
git clone https://github.com/hahuytuan033/BTL-Nhom-4.git
cd BTL-Nhom-4

# 2. Cài đặt backend
cd server
npm install
cp .env.example .env      # Điền các giá trị vào .env
npm run dev               # Chạy trên http://localhost:5000

# 3. Cài đặt frontend (mở terminal mới)
cd client
npm install
cp .env.example .env      # Điền VITE_API_URL
npm run dev               # Chạy trên http://localhost:5173
```

### 14.3 Seed Dữ Liệu Mẫu

```bash
cd server
npm run seed              # Tạo dữ liệu mẫu: admin, sản phẩm, danh mục
```

> **Tài khoản admin mặc định sau khi seed:**
> - Email: `admin@shoeshop.vn`
> - Mật khẩu: `Admin@123`

---

*Tài liệu này được xây dựng bởi Nhóm 4 – Môn Phát Triển Ứng Dụng Web*

