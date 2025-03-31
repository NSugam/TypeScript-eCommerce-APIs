import request from 'supertest';
import app from '../..';
import { AppDataSource } from '../data-source';
import { userEntity } from '../entity/userEntity';
jest.mock('../entity/userEntity');
import bcrypt from 'bcryptjs';

describe('User Registration', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('should register a new user', async () => {
        (userEntity.findOne as jest.Mock).mockResolvedValue(null);
        (userEntity.create as jest.Mock).mockReturnValue({ save: jest.fn() });

        const res = await request(app).post('/api/user/register').send({
            username: 'testuser',
            email: 'sugam@gmail.com',
            phone: '1234567890',
            password: 'sugam123',
            role: 'user'
        });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Account Created');
    });

    it('should return 409 if user already exists', async () => {
        (userEntity.findOne as jest.Mock).mockResolvedValue({email: 'sugam@gmail.com'});

        const res = await request(app).post('/api/user/register').send({
            username: 'existinguser',
            email: 'sugam@gmail.com',
            phone: '1234567890',
            password: 'sugam123',
            role: 'user'
        });

        expect(res.status).toBe(409);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Account already exist');
    });

    it('should login successfully with valid credentials', async () => {
        const hashedPassword = await bcrypt.hash('sugam123', 10);
        (userEntity.findOne as jest.Mock).mockResolvedValue({ id: 1, email: 'sugam@gmail.com', password: hashedPassword });

        const res = await request(app).post('/api/user/login').send({
            email: 'sugam@gmail.com',
            password: 'sugam123'
        });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Login Success');
    });
});
