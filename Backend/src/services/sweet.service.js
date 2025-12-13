const Sweet = require('../models/Sweet');

const purchaseSweet = async (sweetId, purchaseQty) => {
    const sweet = await Sweet.findById(sweetId);

    if (!sweet) throw new Error('Sweet not found');
    if (sweet.quantity <= 0) throw new Error('Out of stock');
    if (purchaseQty > sweet.quantity) throw new Error('Insufficient stock');

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
    if (!sweet) throw new Error('Sweet not found');

    sweet.quantity += restockQty;
    await sweet.save();

    return sweet;
};

const searchSweets = async ({ name, category, minPrice, maxPrice }) => {
    const query = {};

    if (name) {
        query.name = { $regex: name, $options: 'i' };
    }

    if (category) {
        query.category = category;
    }

    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    return Sweet.find(query);
};

module.exports = {
    purchaseSweet,
    restockSweet,
    searchSweets,
};
