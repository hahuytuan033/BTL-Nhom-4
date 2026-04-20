# BIỂU ĐỒ LỚP


Người dùng
│
├── mãNgườiDùng
├── họTên
├── email
├── mậtKhẩu
├── sốĐiệnThoại
├── địaChỉ
└── vaiTrò
│
├── đăngKý()
├── đăngNhập()
└── cậpNhậtThôngTin()

        │ 1
        │
        ▼ N

Đơn hàng
│
├── mãĐơnHàng
├── tổngTiền
├── trạngThái
├── phươngThứcThanhToán
└── ngàyĐặt
│
├── tạoĐơnHàng()
└── hủyĐơnHàng()

        │ 1
        │
        ▼ N

Chi tiết đơn hàng
│
├── mãChiTiết
├── sốLượng
├── giá
└── kíchCỡ

        ▲ N
        │
        │ 1

Sản phẩm
│
├── mãSảnPhẩm
├── tênSảnPhẩm
├── môTả
├── giá
├── tồnKho
└── hìnhẢnh
│
├── thêmSảnPhẩm()
├── cậpNhậtSảnPhẩm()
└── xóaSảnPhẩm()

        ▲ N              ▲ N
        │                │
        │ 1              │ 1
        │                │
Danh mục           Thương hiệu
│                  │
├── mãDanhMục      ├── mãThươngHiệu
└── tênDanhMục     └── tênThươngHiệu


Người dùng 1 ───────► N Đánh giá ◄────── 1 Sản phẩm
                      │
                      ├── mãĐánhGiá
                      ├── sốSao
                      ├── bìnhLuận
                      └── ngàyTạo
                      │
                      └── thêmĐánhGiá()




## Quan hệ giữa các lớp

* Người dùng 1 → N Đơn hàng
* Đơn hàng 1 → N Chi tiết đơn hàng
* Sản phẩm 1 → N Chi tiết đơn hàng
* Danh mục 1 → N Sản phẩm
* Thương hiệu 1 → N Sản phẩm
* Người dùng 1 → N Đánh giá
* Sản phẩm 1 → N Đánh giá


