// test/authController.test.ts
import { Request, Response } from 'express';
import { register, login } from '../src/controllers/authController';
import User from '../src/models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../src/models/user');

describe('authController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };
    });

    describe('register', () => {
        it('should register a new user', async () => {
            req.body = { username: 'testuser', password: 'password' };
            (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
            (User.prototype.save as jest.Mock).mockResolvedValue({});

            await register(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith('User registered');
        });

        it('should return 500 if there is an error', async () => {
            req.body = { username: 'testuser', password: 'password' };
            (bcrypt.hash as jest.Mock).mockRejectedValue(new Error('hash error'));

            await register(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Error registering user');
        });
    });

    describe('login', () => {
        it('should login a user with valid credentials', async () => {
            req.body = { username: 'testuser', password: 'password' };
            (User.findOne as jest.Mock).mockResolvedValue({ _id: 'user_id', password: 'hashed_password' });
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (jwt.sign as jest.Mock).mockReturnValue('token');

            await login(req as Request, res as Response);

            expect(res.json).toHaveBeenCalledWith({ token: 'token' });
        });

        it('should return 400 if credentials are invalid', async () => {
            req.body = { username: 'testuser', password: 'password' };
            (User.findOne as jest.Mock).mockResolvedValue(null);

            await login(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('Invalid credentials');
        });

        it('should return 500 if there is an error', async () => {
            req.body = { username: 'testuser', password: 'password' };
            (User.findOne as jest.Mock).mockRejectedValue(new Error('find error'));

            await login(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Error logging in');
        });
    });
});