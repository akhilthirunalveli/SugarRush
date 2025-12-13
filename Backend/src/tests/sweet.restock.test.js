require('dotenv').config();

const mongoose = require('mongoose');
const Sweet = require('../models/Sweet');
const sweetService = require('../services/sweet.service');

describe('Sweet Restock Service', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    beforeEach(async () => {
        await Sweet.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should increase quantity when restocked by admin', async () => {
        const sweet = await Sweet.create({
            name: 'Rasgulla',
            category: 'Indian',
            price: 20,
            quantity: 10,
        });

        const adminUser = { role: 'admin' };

        const updatedSweet = await sweetService.restockSweet(
            sweet._id,
            15,
            adminUser
        );

        expect(updatedSweet.quantity).toBe(25);
    });

    it('should throw error if restock is attempted by non-admin', async () => {
        const sweet = await Sweet.create({
            name: 'Peda',
            category: 'Indian',
            price: 18,
            quantity: 5,
        });

        const normalUser = { role: 'user' };

        await expect(
            sweetService.restockSweet(sweet._id, 10, normalUser)
        ).rejects.toThrow('Admin access required');
    });

    it('should throw error when restock quantity is invalid', async () => {
        const sweet = await Sweet.create({
            name: 'Halwa',
            category: 'Indian',
            price: 25,
            quantity: 8,
        });

        const adminUser = { role: 'admin' };

        await expect(
            sweetService.restockSweet(sweet._id, 0, adminUser)
        ).rejects.toThrow('Invalid restock quantity');
    });
});
