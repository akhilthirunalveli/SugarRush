require('dotenv').config();

const mongoose = require('mongoose');
const Sweet = require('../models/Sweet');
const sweetService = require('../services/sweet.service');

describe('Sweet Search Service', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
    });

    beforeEach(async () => {
        await Sweet.deleteMany({});

        await Sweet.insertMany([
            {
                name: 'Kaju Katli',
                category: 'Indian',
                price: 30,
                quantity: 20,
            },
            {
                name: 'Halwa',
                category: 'Indian',
                price: 50,
                quantity: 10,
            },
            {
                name: 'Milk Cake',
                category: 'Indian',
                price: 40,
                quantity: 15,
            },
        ]);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should search sweets by name (case-insensitive)', async () => {
        const results = await sweetService.searchSweets({
            name: 'kaju',
        });

        expect(results.length).toBe(1);
        expect(results[0].name).toBe('Kaju Katli');
    });

    it('should filter sweets by category and price range', async () => {
        const results = await sweetService.searchSweets({
            category: 'Indian',
            minPrice: 35,
            maxPrice: 45,
        });

        expect(results.length).toBe(1);
        expect(results[0].name).toBe('Milk Cake');
    });

    it('should return empty array when no sweets match', async () => {
        const results = await sweetService.searchSweets({
            category: 'Bakery',
        });

        expect(results).toEqual([]);
    });
});
