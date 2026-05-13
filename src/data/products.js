/**
 * Dữ liệu sản phẩm mẫu
 * Tách riêng để dễ thay thế bằng API thực tế sau này
 */
export const shoeData = [
  {
    id: 1,
    brand: "JORDAN",
    title: "Jordan 1 Retro Low OG SP Travis Scott Canary",
    price: "32.500.000",
    soldCount: "1.2k+",
    image:
      "https://images.stockx.com/360/Air-Jordan-1-Retro-Low-OG-Travis-Scott-Canary-W/Images/Air-Jordan-1-Retro-Low-OG-Travis-Scott-Canary-W/Lv2/img01.jpg?fm=avif&auto=compress&w=576",
    isNew: true,
  },
  {
    id: 2,
    brand: "NIKE",
    title: "Nike Dunk Low Retro White Black 'Panda'",
    price: "3.200.000",
    soldCount: "45k+",
    image:
      "https://images.stockx.com/360/Nike-Dunk-Low-Retro-White-Black-2021/Images/Nike-Dunk-Low-Retro-White-Black-2021/Lv2/img01.jpg?fm=avif&auto=compress&w=576",
  },
  {
    id: 3,
    brand: "ADIDAS",
    title: "Adidas Samba OG Cloud White Core Black",
    price: "2.800.000",
    soldCount: "12k+",
    image:
      "https://images.stockx.com/360/adidas-Samba-OG-Cloud-White-Core-Black/Images/adidas-Samba-OG-Cloud-White-Core-Black/Lv2/img01.jpg?fm=avif&auto=compress&w=576",
  },
  {
    id: 4,
    brand: "ESSENTIALS",
    title: "Fear of God Essentials Hoodie 'Black'",
    price: "2.500.000",
    soldCount: "8k+",
    image:
      "https://images.stockx.com/360/Fear-of-God-Essentials-Hoodie-Light-Oatmeal/Images/Fear-of-God-Essentials-Hoodie-Light-Oatmeal/Lv2/img01.jpg?fm=avif&auto=compress&w=576",
  },
  {
    id: 5,
    brand: "YEEZY",
    title: "Yeezy Boost 350 V2 'Bone'",
    price: "6.100.000",
    soldCount: "5.4k+",
    image:
      "https://images.stockx.com/360/adidas-Yeezy-Boost-350-V2-Bone/Images/adidas-Yeezy-Boost-350-V2-Bone/Lv2/img01.jpg?fm=avif&auto=compress&w=576",
  },
  {
    id: 6,
    brand: "NEW BALANCE",
    title: "New Balance 1906R Silver Metallic Royal",
    price: "4.500.000",
    soldCount: "2.1k+",
    image:
      "https://images.stockx.com/360/New-Balance-1906R-Metallic-Silver-Royal/Images/New-Balance-1906R-Metallic-Silver-Royal/Lv2/img01.jpg?fm=avif&auto=compress&w=576",
  },
];

/**
 * Danh mục sản phẩm
 * Icon được truyền từ component sử dụng để tránh import lucide-react ở đây
 */
export const categoryNames = [
  "Sneakers",
  "Streetwear",
  "Watches",
  "Collectibles",
  "Handbags",
  "Apparel",
];

/**
 * Thông tin đăng nhập mạng xã hội
 */
export const socialLogins = [
  {
    name: "Google",
    icon: "https://www.svgrepo.com/show/475656/google-color.svg",
  },
  {
    name: "Facebook",
    icon: "https://www.svgrepo.com/show/475647/facebook-color.svg",
  },
  {
    name: "Apple",
    icon: "https://www.svgrepo.com/show/303108/apple-black-logo.svg",
    invert: true,
  },
  { name: "X", isIconComponent: true },
];

/**
 * Danh sách đối tác
 */
export const partnerBrands = [
  "Nike",
  "Jordan",
  "Adidas",
  "Yeezy",
  "StockX",
  "GOAT",
];

/**
 * Link dịch vụ footer
 */
export const footerServices = [
  "Xác thực sản phẩm",
  "Ký gửi hàng hóa",
  "Vận chuyển quốc tế",
  "Bảo hiểm giao dịch",
];

/**
 * Link hỗ trợ footer
 */
export const footerSupport = [
  "Trung tâm trợ giúp",
  "Câu hỏi thường gặp",
  "Chính sách đổi trả",
  "Liên hệ với N4",
];
