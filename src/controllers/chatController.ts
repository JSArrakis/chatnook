import { Server, Socket } from 'socket.io';

export const chatController = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('New client connected');

        socket.on('message', (message) => {
            console.log(`Received message: ${message}`);
            // Broadcast the message to all clients
            io.emit('message', message);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};