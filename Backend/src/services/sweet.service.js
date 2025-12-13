const Sweet = require('../models/Sweet');

const purchaseSweet = async (sweetId, purchaseQty) => {
    const sweet = await Sweet.findById(sweetId);

    if (!sweet) {
        throw new Error('Sweet not found');
    }

    if (sweet.quantity === 0) {
        throw new Error('Out of stock');
    }

    if (sweet.quantity < purchaseQty) {
        throw new Error('Insufficient stock');
    }

    sweet.quantity -= purchaseQty;
    await sweet.save();

    return sweet;
};

module.exports = {
    purchaseSweet,
};
