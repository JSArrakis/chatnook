// test/user.test.ts
import User, { IUser } from '../src/models/user';

describe('User model', () => {
    it('should create a new user', async () => {
        const user: IUser = new User({ username: 'testuser', password: 'password' });
        await user.validate();
    });

    it('should require a username', async () => {
        const user: IUser = new User({ password: 'password' });
        let err;
        try {
            await user.validate();
        } catch (error) {
            err = error;
        }
        expect(err).toBeDefined();
    });

    it('should require a password', async () => {
        const user: IUser = new User({ username: 'testuser' });
        let err;
        try {
            await user.validate();
        } catch (error) {
            err = error;
        }
        expect(err).toBeDefined();
    });
});