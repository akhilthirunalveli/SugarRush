const Sweet = require('../models/Sweet');
const sweetService = require('../services/sweet.service');

exports.createSweet = async (req, res, next) => {
    try {
        const sweet = await Sweet.create(req.body);
        res.status(201).json(sweet);
    } catch (err) {
        next(err);
    }
};

exports.getAllSweets = async (req, res, next) => {
    try {
        const sweets = await Sweet.find();
        res.json(sweets);
    } catch (err) {
        next(err);
    }
};

exports.updateSweet = async (req, res, next) => {
    try {
        const sweet = await Sweet.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!sweet) {
            return res.status(404).json({ message: 'Sweet not found' });
        }

        res.json(sweet);
    } catch (err) {
        next(err);
    }
};

exports.deleteSweet = async (req, res, next) => {
    try {
        const sweet = await Sweet.findByIdAndDelete(req.params.id);

        if (!sweet) {
            return res.status(404).json({ message: 'Sweet not found' });
        }

        res.json({ message: 'Sweet deleted' });
    } catch (err) {
        next(err);
    }
};

exports.purchaseSweet = async (req, res, next) => {
    try {
        const { quantity } = req.body;

        const sweet = await sweetService.purchaseSweet(
            req.params.id,
            quantity
        );

        res.json(sweet);
    } catch (err) {
        next(err);
    }
};

exports.restockSweet = async (req, res, next) => {
    try {
        const { quantity } = req.body;

        const sweet = await sweetService.restockSweet(
            req.params.id,
            quantity,
            req.user
        );

        res.json(sweet);
    } catch (err) {
        next(err);
    }
};

exports.searchSweets = async (req, res, next) => {
    try {
        const sweets = await sweetService.searchSweets(req.query);
        res.json(sweets);
    } catch (err) {
        next(err);
    }
};
