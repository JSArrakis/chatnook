import mongoose from 'mongoose';
import http from 'http';
import app from './app';
import { chatController } from './controllers/chatController';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/streamAssistantMedia'

mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server);

// Initialize chat controller
chatController(io);

// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});