const { cloudinary } = require('./config/cloudinary');

async function testUpload() {
    try {
        console.log('⏳ Đang thử upload ảnh test lên Cloudinary...');
        // Upload một tấm ảnh mẫu từ internet
        const result = await cloudinary.uploader.upload("https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", {
            folder: 'btl-nhom-4/products'
        });
        
        console.log('✅ Upload thành công!');
        console.log('🔗 Link ảnh:', result.secure_url);
        console.log('📂 Thư mục "btl-nhom-4/products" hiện đã có trên Cloudinary của bạn.');
    } catch (error) {
        console.error('❌ Lỗi upload:', error.message);
        console.error('Hãy kiểm tra lại API Key và Secret trong file .env');
    }
}

testUpload();
