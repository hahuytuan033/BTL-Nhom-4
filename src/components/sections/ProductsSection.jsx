import ProductCard from '../ui/ProductCard';
import SectionHeader from '../ui/SectionHeader';

/**
 * Section hiển thị danh sách sản phẩm
 * @param {string} title - Tiêu đề section
 * @param {string} subtitle - Mô tả phụ
 * @param {Array} products - Danh sách sản phẩm
 * @param {boolean} forceNew - Bắt buộc tất cả sản phẩm hiển thị badge "MỚI"
 * @param {string} keyPrefix - Prefix cho key tránh trùng lặp khi render 2 lần
 */
const ProductsSection = ({ title, subtitle, products, forceNew = false, keyPrefix = '' }) => (
  <section className={forceNew ? "mb-16" : "mb-24"}>
    <SectionHeader title={title} subtitle={subtitle} />
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
      {products.map(item => (
        <ProductCard 
          key={`${keyPrefix}${item.id}`} 
          {...item} 
          isNew={forceNew ? true : item.isNew} 
        />
      ))}
    </div>
  </section>
);

export default ProductsSection;
