import express from 'express';
import cartItemController from '../controllers/cartItemController.js';
const router = express.Router();

router.post('/', cartItemController.create);
router.put('/:id', cartItemController.update);
router.patch('/:id', cartItemController.update);
router.delete('/:id', cartItemController.delete);

export default router;