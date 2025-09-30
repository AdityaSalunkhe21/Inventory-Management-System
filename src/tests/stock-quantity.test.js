// src/tests/stock-quantity.test.js
import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import app from '../server.js';
import prisma from '../db.js';

describe('Stock Quantity API Tests', () => {
    let testProductId;
    let nonExistentId = 999999;

    beforeAll(async () => {
        await prisma.product.deleteMany({
            where: { name: { startsWith: 'Test Product' } }
        });
    });

    beforeEach(async () => {
        const testProduct = await prisma.product.create({
            data: {
                name: 'Test Product for Stock',
                description: 'Test product description',
                stock_quantity: 10
            }
        });
        testProductId = testProduct.id;
    });

    afterEach(async () => {
        if (testProductId) {
            await prisma.product.deleteMany({
                where: { id: testProductId }
            });
        }
    });

    afterAll(async () => {
        await prisma.product.deleteMany({
            where: { name: { startsWith: 'Test Product' } }
        });
        await prisma.$disconnect();
    });

    describe('PATCH /:id/increase-stock', () => {
        it('should increase stock quantity with valid id and quantity', async () => {
            const response = await request(app)
                .patch(`/products/${testProductId}/increase-stock`)
                .send({ quantity: 5 })
                .expect(200);

            expect(response.body.stock_quantity).toBe(15);
        });

        // ID Tests
        it('should return 404 for non-existent product id', async () => {
            const response = await request(app)
                .patch(`/products/${nonExistentId}/increase-stock`)
                .send({ quantity: 5 })
                .expect(404);

            expect(response.body).toHaveProperty('message', 'Product not found');
        });

        it('should return 400 for invalid product id parameter', async () => {
            const response = await request(app)
                .patch('/products/invalid-id/increase-stock')
                .send({ quantity: 5 })
                .expect(400);

            expect(response.body).toHaveProperty('message', 'Invalid product id');
        });

        it('should return 400 for negative product id', async () => {
            const response = await request(app)
                .patch('/products/-1/increase-stock')
                .send({ quantity: 5 })
                .expect(400);

            expect(response.body).toHaveProperty('message', 'Invalid product id');
        });

        // Quantity Tests
        it('should default to quantity 1 when quantity is not provided', async () => {
            const response = await request(app)
                .patch(`/products/${testProductId}/increase-stock`)
                .send({})
                .expect(200);

            expect(response.body.stock_quantity).toBe(11);
        });

        it('should return 400 for invalid quantity parameter', async () => {
            const response = await request(app)
                .patch(`/products/${testProductId}/increase-stock`)
                .send({ quantity: 'invalid' })
                .expect(400);

            expect(response.body).toHaveProperty('message', 'Invalid quantity');
        });

        it('should return 400 for negative quantity parameter', async () => {
            const response = await request(app)
                .patch(`/products/${testProductId}/increase-stock`)
                .send({ quantity: -5 })
                .expect(400);

            expect(response.body).toHaveProperty('message', 'Invalid quantity');
        });
    });

    describe('PATCH /:id/decrease-stock', () => {
        it('should decrease stock quantity with valid id and quantity', async () => {
            const response = await request(app)
                .patch(`/products/${testProductId}/decrease-stock`)
                .send({ quantity: 3 })
                .expect(200);

            expect(response.body.stock_quantity).toBe(7);
        });

        // ID Tests
        it('should return 404 for non-existent product id', async () => {
            const response = await request(app)
                .patch(`/products/${nonExistentId}/decrease-stock`)
                .send({ quantity: 5 })
                .expect(404);

            expect(response.body).toHaveProperty('message', 'Product not found');
        });

        it('should return 400 for invalid product id parameter', async () => {
            const response = await request(app)
                .patch('/products/invalid-id/decrease-stock')
                .send({ quantity: 5 })
                .expect(400);

            expect(response.body).toHaveProperty('message', 'Invalid product id');
        });

        it('should return 400 for negative product id', async () => {
            const response = await request(app)
                .patch('/products/-1/decrease-stock')
                .send({ quantity: 5 })
                .expect(400);

            expect(response.body).toHaveProperty('message', 'Invalid product id');
        });

        // Quantity Tests
        it('should default to quantity 1 when quantity is not provided', async () => {
            const response = await request(app)
                .patch(`/products/${testProductId}/decrease-stock`)
                .send({})
                .expect(200);

            expect(response.body.stock_quantity).toBe(9);
        });

        it('should return 400 for invalid quantity parameter', async () => {
            const response = await request(app)
                .patch(`/products/${testProductId}/decrease-stock`)
                .send({ quantity: 'invalid' })
                .expect(400);

            expect(response.body).toHaveProperty('message', 'Invalid quantity');
        });

        it('should return 400 for negative quantity parameter', async () => {
            const response = await request(app)
                .patch(`/products/${testProductId}/decrease-stock`)
                .send({ quantity: -5 })
                .expect(400);

            expect(response.body).toHaveProperty('message', 'Invalid quantity');
        });

        // Insufficient Stock Test
        it('should return 400 when trying to decrease more stock than available', async () => {
            const response = await request(app)
                .patch(`/products/${testProductId}/decrease-stock`)
                .send({ quantity: 15 })
                .expect(400);

            expect(response.body).toHaveProperty('message', 'Insufficient stock quantity');

            const unchangedProduct = await prisma.product.findUnique({
                where: { id: testProductId }
            });
            expect(unchangedProduct.stock_quantity).toBe(10);
        });
    });
});
