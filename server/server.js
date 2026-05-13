const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const { connectDb } = require('./config/db');
const { createUser } = require('./models/userModel');

// Start Server & DB
async function startServer() {
    try {
        await connectDb();
        
        // Tạo tài khoản Admin demo trước
        await createUser({
            fullName: "Nguyễn Tuấn Phúc",
            email: "admin@gmail.com",
            password: "123456",
            role: "admin",
            status: "active"
        });

        server.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
    }
}

startServer();
