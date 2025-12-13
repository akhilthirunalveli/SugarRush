require('dotenv').config();

const mongoose = require('mongoose');
const Sweet = require('../models/Sweet');
const sweetService = require('../services/sweet.service');

describe('Sweet Purchase Service', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    beforeEach(async () => {
        await Sweet.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should reduce quantity when purchase is valid', async () => {
        const sweet = await Sweet.create({
            name: 'Thirunalveli Halwa',
            category: 'Indian',
            price: 10,
            quantity: 20,
        });

        const updatedSweet = await sweetService.purchaseSweet(
            sweet._id,
            5
        );

        expect(updatedSweet.quantity).toBe(15);
    });

    it('should throw error when stock is insufficient', async () => {
        const sweet = await Sweet.create({
            name: 'Barfi',
            category: 'Indian',
            price: 15,
            quantity: 3,
        });

        await expect(
            sweetService.purchaseSweet(sweet._id, 5)
        ).rejects.toThrow('Insufficient stock');
    });

    it('should throw error when sweet is out of stock', async () => {
        const sweet = await Sweet.create({
            name: 'Jalebi',
            category: 'Indian',
            price: 12,
            quantity: 0,
        });

        await expect(
            sweetService.purchaseSweet(sweet._id, 1)
        ).rejects.toThrow('Out of stock');
    });
});
