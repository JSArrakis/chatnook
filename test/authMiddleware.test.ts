import { Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../src/middleware/authMiddleware';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('authMiddleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            header: jest.fn()
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            locals: {} // Initialize res.locals
        };
        next = jest.fn();
    });

    it('should return 401 if no token is provided', () => {
        (req.header as jest.Mock).mockReturnValue(null);

        authMiddleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Access denied');
    });

    it('should return 400 if token is invalid', () => {
        (req.header as jest.Mock).mockReturnValue('invalid-token');
        (jwt.verify as jest.Mock).mockImplementation(() => {
            throw new Error('Invalid token');
        });

        authMiddleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith('Invalid token');
    });

    it('should call next if token is valid and store decoded token in res.locals', () => {
        const validToken = 'valid-token';
        const decodedToken = { userId: '123' };
        (req.header as jest.Mock).mockReturnValue(validToken);
        (jwt.verify as jest.Mock).mockReturnValue(decodedToken);

        authMiddleware(req as Request, res as Response, next);

        expect((res.locals as any).user).toEqual(decodedToken); // Use type assertion
        expect(next).toHaveBeenCalled();
    });
});