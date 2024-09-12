import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import { chatController } from './controllers/chatController';

const port = process.env.PORT || 3000;

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