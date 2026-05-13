const couchbase = require('couchbase');
require('dotenv').config();

const clusterConnStr = process.env.COUCHBASE_URL || 'couchbase://localhost';
const username = process.env.COUCHBASE_USER;
const password = process.env.COUCHBASE_PASS;
const bucketName = process.env.COUCHBASE_BUCKET;

let cluster = null;
let bucket = null;

async function connectDb() {
    if (cluster) return { cluster, bucket };

    try {
        console.log('⏳ Đang kết nối tới Couchbase Server cục bộ...');
        cluster = await couchbase.connect(clusterConnStr, {
            username: username,
            password: password,
        });

        bucket = cluster.bucket(bucketName);

        // Kiểm tra kết nối
        await bucket.ping();

        console.log(`✅ Kết nối thành công tới Couchbase Server! Bucket: "${bucketName}"`);
        return { cluster, bucket };
    } catch (error) {
        console.error('❌ Lỗi kết nối Couchbase Server:');
        console.error('- Đảm bảo Couchbase Server đang chạy trên máy của bạn.');
        console.error(`- Kiểm tra xem Bucket "${bucketName}" đã được tạo chưa.`);
        console.error('- Kiểm tra lại Username/Password trong file .env.');
        console.error('- Lỗi chi tiết:', error.message);
        throw error;
    }
}


module.exports = { connectDb };
