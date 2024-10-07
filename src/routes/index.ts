import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/protected', authMiddleware, (req, res) => {
    res.send('This is a protected route');
});

export default router;