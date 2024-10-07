import request from 'supertest';
import app from '../src/app';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('GET /', () => {
    it('should return 200 OK', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.text).toBe('Hello World!');
    });
});

describe('GET /protected', () => {
    it('should return 401 if no token is provided', async () => {
        const res = await request(app).get('/protected');
        expect(res.status).toBe(401);
        expect(res.text).toBe('Access denied');
    });

    it('should return 200 if valid token is provided', async () => {
        const token = 'valid_token';
        (jwt.verify as jest.Mock).mockReturnValue({ id: 'user_id' }); 

        const res = await request(app).get('/protected').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.text).toBe('This is a protected route');
    });
});