const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/btl_nhom_4';

async function queryUsers() {
  try {
    await mongoose.connect(mongoURI);
    const User = mongoose.model('User', new mongoose.Schema({
      fullName: String,
      email: String,
      role: String
    }));

    const users = await User.find({});
    console.log('Registered Users in DB:', JSON.stringify(users, null, 2));
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

queryUsers();
