import express from 'express';
import itemCarrinhoController from '../controllers/itemCarrinhoController.js';
const router = express.Router();

router.post('/', itemCarrinhoController.create);
router.put('/:id', itemCarrinhoController.update);
router.patch('/:id', itemCarrinhoController.update);
router.delete('/:id', itemCarrinhoController.delete);

export default router;
