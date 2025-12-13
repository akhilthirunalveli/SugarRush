require('dotenv').config();

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');

describe('Auth API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    beforeEach(async () => {
        await User.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user and return a token', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'testuser@test.com',
                    password: 'password123',
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.token).toBeDefined();
        });

        it('should not allow duplicate registration', async () => {
            await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'testuser@test.com',
                    password: 'password123',
                });

            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'testuser@test.com',
                    password: 'password123',
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('User already exists');
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login an existing user and return a token', async () => {
            await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'login@test.com',
                    password: 'password123',
                });

            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'login@test.com',
                    password: 'password123',
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.token).toBeDefined();
        });

        it('should reject invalid credentials', async () => {
            await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'login@test.com',
                    password: 'password123',
                });

            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'login@test.com',
                    password: 'wrongpassword',
                });

            expect(res.statusCode).toBe(401);
            expect(res.body.message).toBe('Invalid credentials');
        });
    });
});
