import express from 'express';
import cartController from '../controllers/cartController.js';
const router = express.Router();

router.get('/:id', cartController.getById);
router.put('/:id', cartController.update);
router.patch('/:id', cartController.update);

export default router;