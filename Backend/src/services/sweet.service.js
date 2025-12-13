const Sweet = require('../models/Sweet');

const purchaseSweet = async (sweetId, purchaseQty) => {
    const sweet = await Sweet.findById(sweetId);

    if (!sweet) {
        throw new Error('Sweet not found');
    }

    if (sweet.quantity <= 0) {
        throw new Error('Out of stock');
    }

    if (purchaseQty > sweet.quantity) {
        throw new Error('Insufficient stock');
    }

    sweet.quantity -= purchaseQty;
    await sweet.save();

    return sweet;
};

const restockSweet = async (sweetId, restockQty, user) => {
    if (!user || user.role !== 'admin') {
        throw new Error('Admin access required');
    }

    if (restockQty <= 0) {
        throw new Error('Invalid restock quantity');
    }

    const sweet = await Sweet.findById(sweetId);

    if (!sweet) {
        throw new Error('Sweet not found');
    }

    sweet.quantity += restockQty;
    await sweet.save();

    return sweet;
};

module.exports = {
    purchaseSweet,
    restockSweet,
};
