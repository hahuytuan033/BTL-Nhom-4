# DANH SÁCH CHỨC NĂNG HỆ THỐNG

## 👤 1. Phân hệ Khách hàng (Customer Storefront)

### Quản lý Tài khoản & Xác thực:
- **Đăng ký:** Tạo tài khoản mới, yêu cầu email định dạng Gmail (@gmail.com).
- **Đăng nhập:** Đăng nhập an toàn với JWT (JSON Web Token).
- **Hồ sơ cá nhân (User Profile):** Quản lý thông tin họ tên, email, tên người dùng, địa chỉ giao hàng và tùy chọn kích thước (giày/quần áo).

### Trải nghiệm Mua sắm:
- **Trang chủ:** Banner Hero chuyên nghiệp, danh mục sản phẩm trực quan, đề xuất sản phẩm và hàng mới về.
- **Tìm kiếm:** Thanh tìm kiếm trung tâm giúp tìm nhanh sản phẩm theo tên, thương hiệu.
- **Xem sản phẩm:** Hiển thị thông tin sản phẩm (tên, giá, thương hiệu, lượt bán) kèm hình ảnh từ Cloudinary.
- **Yêu thích (Wishlist):** Thêm/Xóa sản phẩm vào danh sách yêu thích cá nhân.
- **Lịch sử đơn hàng:** Xem danh sách các đơn hàng đã đặt và theo dõi trạng thái hiện tại.

---

## ⚙️ 2. Phân hệ Quản trị viên (Admin Dashboard)

### Bảng Điều khiển (Dashboard):
- **Thống kê tổng hợp:** Tổng số sản phẩm, đơn hàng, khách hàng và tổng doanh thu.
- **Thông báo thời gian thực:** Nhận thông báo mới nhất về khách hàng đăng ký và đơn hàng mới đặt.
- **Theo dõi kho hàng:** Hiển thị các sản phẩm sắp hết hàng để Admin kịp thời bổ sung.

### Quản lý Sản phẩm:
- **Danh sách sản phẩm:** Xem thông tin chi tiết toàn bộ sản phẩm trong hệ thống.
- **Thêm sản phẩm:** Nhập thông tin và upload hình ảnh trực tiếp lên Cloudinary.
- **Xóa sản phẩm:** Loại bỏ sản phẩm không còn kinh doanh khỏi hệ thống.

### Quản lý Đơn hàng:
- **Theo dõi đơn hàng:** Xem danh sách đơn hàng kèm mã đơn, khách hàng, số lượng và tổng tiền.
- **Cập nhật trạng thái:** Chuyển đổi trạng thái đơn hàng (Chờ xác nhận -> Đang xử lý -> Đang giao -> Hoàn thành).

### Quản lý Khách hàng:
- **Danh sách người dùng:** Xem thông tin khách hàng, vai trò (Admin/User) và ngày tham gia.
- **Kiểm soát trạng thái:** Khóa hoặc mở khóa tài khoản khách hàng để đảm bảo an ninh hệ thống.

### Báo cáo & Cài đặt:
- **Thống kê doanh thu:** Biểu đồ doanh thu 6 tháng gần nhất để theo dõi hiệu quả kinh doanh.
- **Cài đặt hệ thống:** Cấu hình tên trang web, thông tin liên hệ, múi giờ, bảo mật và thông báo.
