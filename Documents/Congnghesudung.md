# CÔNG NGHỆ SỬ DỤNG TRONG DỰ ÁN

Dự án được xây dựng dựa trên kiến trúc hiện đại, đảm bảo tính mở rộng và hiệu năng cao.

## 1. Frontend (Giao diện người dùng)

- **Phân hệ Khách hàng:**
    - **Framework:** React.js (phiên bản 18+).
    - **Build Tool:** Vite (cho tốc độ phản hồi cực nhanh).
    - **Styling:** Tailwind CSS (sử dụng tiện ích CSS hiện đại).
    - **Icons:** Lucide React (bộ icon tối giản và đẹp mắt).

- **Phân hệ Quản trị (Admin Dashboard):**
    - **Framework:** React.js (phiên bản 19).
    - **Build Tool:** Vite.
    - **Styling:** Custom CSS (Admin layout chuyên dụng).
    - **Data Fetching:** Axios.

## 2. Backend (Máy chủ & Xử lý)

- **Runtime:** Node.js.
- **Framework:** Express.js (Express 5.x).
- **Real-time:** Socket.io (Sử dụng để gửi thông báo tức thời cho Admin).
- **Authentication:** 
    - JSON Web Token (JWT) để xác thực phiên làm việc.
    - Bcrypt.js để mã hóa mật khẩu an toàn.
- **Middleware:** Multer & Multer-storage-cloudinary (Xử lý upload ảnh).

## 3. Database & Storage (Cơ sở dữ liệu & Lưu trữ)

- **Database:** MongoDB Atlas (NoSQL database).
- **ODM:** Mongoose (Định nghĩa Schema và tương tác với MongoDB).
- **Image Storage:** Cloudinary (Hệ thống CDN lưu trữ và tối ưu hóa hình ảnh sản phẩm).

## 4. Công cụ phát triển (Dev Tools)

- **Version Control:** Git & GitHub.
- **Environment:** Dotenv (Quản lý các biến môi trường nhạy cảm).
- **Testing:** Postman (Kiểm thử API).
