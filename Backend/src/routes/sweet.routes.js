const express = require('express');
const router = express.Router();

const sweetController = require('../controllers/sweet.controller');
const { protect, adminOnly } = require('../middlewares/auth.middleware');

router.use(protect);

router.post('/', sweetController.createSweet);
router.get('/', sweetController.getAllSweets);
router.put('/:id', adminOnly, sweetController.updateSweet);

router.delete('/:id', adminOnly, sweetController.deleteSweet);

router.post('/:id/purchase', sweetController.purchaseSweet);
router.post('/:id/restock', adminOnly, sweetController.restockSweet);

router.get('/search', sweetController.searchSweets);

module.exports = router;

