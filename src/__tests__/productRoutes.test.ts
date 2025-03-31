import request from 'supertest';
import app from '../..';
import { AppDataSource } from '../data-source';
import { productEntity } from '../entity/productEntity';
jest.mock('../entity/productEntity');

describe('Product Registration', () => {
    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('should add a new product', async () => {
        (productEntity.create as jest.Mock).mockReturnValue({ save: jest.fn() });

        const res = await request(app).post('/api/product/add').send({
            "title": "Gaming Keyboard",
            "price": 5500,
            "description": "A comfortable and ergonomic gaming keyboard",
            "stock": 100,
            "sku": "GK-Keyboard"
        });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Product added successfully');
    });
});
