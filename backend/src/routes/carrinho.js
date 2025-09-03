import express from 'express';
import carrinhoController from '../controllers/carrinhoController.js';
const router = express.Router();

router.get('/:id', carrinhoController.getById);
router.put('/:id', carrinhoController.update);
router.patch('/:id', carrinhoController.update);

export default router;
