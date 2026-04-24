# Biểu đồ Sequence (Sequence Diagram)

![Sequence Diagram](Images/Sequense_Diagram.png)


# ĐẶC TẢ CÁC GIAI ĐOẠN NGHIỆP VỤ HỆ THỐNG

Tài liệu này chi tiết hóa luồng tương tác giữa Người dùng (Khách hàng/Admin) và Hệ thống qua từng giai đoạn then chốt của một nền tảng Thương mại điện tử.

---

## 1. Giai đoạn: Khám phá & Đăng nhập
**Mục tiêu:** Thu hút khách hàng vào hệ thống và xác thực danh tính để cá nhân hóa trải nghiệm.

### 1.1 Xem sản phẩm
* **Hành động:** Khách hàng truy cập trang chủ hoặc các danh mục sản phẩm.
* **Xử lý:** Hệ thống tiếp nhận yêu cầu, truy xuất dữ liệu sản phẩm và trả về giao diện hiển thị danh sách mẫu mã, giá cả giúp khách hàng dễ dàng duyệt và tìm kiếm.

### 1.2 Xác thực (Authentication)
* **Hành động:** Khách hàng gửi thông tin đăng nhập bao gồm `Email` và `Mật khẩu`.
* **Xử lý:** - Hệ thống thực hiện kiểm tra tính hợp lệ của thông tin.
    - Nếu thông tin chính xác, hệ thống thông báo đăng nhập thành công.
    - Cấp quyền truy cập thông qua phiên làm việc (Session) hoặc mã định danh (JWT Token).

---

## 2. Giai đoạn: Giỏ hàng & Đặt hàng
**Mục tiêu:** Thực hiện luồng chức năng cốt lõi (Happy Path) để chuyển đổi từ người xem thành người mua hàng.

### 2.1 Thêm sản phẩm vào giỏ hàng
* **Hành động:** Khách hàng chọn mẫu giày, kích cỡ (size), số lượng và nhấn nút "Thêm vào giỏ".
* **Xử lý:** Hệ thống cập nhật dữ liệu giỏ hàng và phản hồi trực quan ngay lập tức bằng cách tăng số lượng hiển thị trên icon giỏ hàng.

### 2.2 Thanh toán (Checkout)
* **Hành động:** Khách hàng cung cấp thông tin giao hàng (tên, số điện thoại, địa chỉ) và xác nhận đặt hàng với phương thức thanh toán khi nhận hàng (COD).

### 2.3 Xử lý ngầm (Background Processing)
* **Xử lý:** Ngay sau khi xác nhận đặt hàng, hệ thống tự động thực thi chuỗi tác vụ:
    - Kiểm tra và trừ số lượng sản phẩm trong kho.
    - Khởi tạo bản ghi đơn hàng mới trong cơ sở dữ liệu.
    - Làm trống giỏ hàng của khách hàng.
    - Trả về thông báo đặt hàng thành công kèm mã đơn hàng (Order ID).

---

## 3. Giai đoạn: Xử lý đơn hàng (Dành cho Admin)
**Mục tiêu:** Quản trị và vận hành đơn hàng để đảm bảo sản phẩm đến tay khách hàng hiệu quả.

### 3.1 Kiểm tra đơn hàng mới
* **Hành động:** Quản trị viên (Admin) truy cập trang quản trị và yêu cầu xem danh sách đơn hàng.
* **Xử lý:** Hệ thống thực hiện lọc và hiển thị danh sách các đơn hàng có trạng thái `Pending` (Chờ xử lý), bao gồm cả những đơn hàng vừa được khách hàng thiết lập.

### 3.2 Cập nhật trạng thái vận hành
* **Hành động:** Admin kiểm tra thông tin và chuyển trạng thái đơn hàng từ "Chờ xử lý" sang "Đang giao".
* **Xử lý:** - Hệ thống ghi nhận thay đổi vào cơ sở dữ liệu.
    - Phản hồi thông báo cập nhật thành công lên màn hình quản trị.