import { Server } from 'socket.io';
import { chatController } from '../src/controllers/chatController';

describe('ChatController', () => {
    let io: Server;
    let socket: any;

    beforeEach(() => {
        io = new Server();
        socket = {
            on: jest.fn(),
            emit: jest.fn()
        };
        io.on = jest.fn((event: string, callback: Function) => {
            if (event === 'connection') {
                callback(socket);
            }
        }) as unknown as Server['on'];
        io.emit = jest.fn(); // Mock io.emit
    });

    it('should handle new client connections', () => {
        chatController(io);

        expect(io.on).toHaveBeenCalledWith('connection', expect.any(Function));
        expect(socket.on).toHaveBeenCalledWith('message', expect.any(Function));
        expect(socket.on).toHaveBeenCalledWith('disconnect', expect.any(Function));
    });

    it('should broadcast messages to all clients', () => {
        chatController(io);

        const messageHandler = socket.on.mock.calls.find((call: [string, Function]) => call[0] === 'message')[1];
        messageHandler('test message');

        expect(io.emit).toHaveBeenCalledWith('message', 'test message');
    });
});