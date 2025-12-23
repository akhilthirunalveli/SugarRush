const express = require('express');
const router = express.Router();

const sweetController = require('../controllers/sweet.controller');
const { protect, adminOnly } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', sweetController.getAllSweets);
router.get('/search', sweetController.searchSweets);

// Protected routes
router.post('/', protect, adminOnly, sweetController.createSweet);
router.put('/:id', protect, adminOnly, sweetController.updateSweet);
router.delete('/:id', protect, adminOnly, sweetController.deleteSweet);
router.post('/:id/amount', sweetController.calculateamount);

router.post('/:id/purchase', protect, sweetController.purchaseSweet);
router.post('/:id/restock', protect, adminOnly, sweetController.restockSweet);

module.exports = router;

