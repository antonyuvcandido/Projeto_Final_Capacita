import express from 'express';
import produtoController from '../controllers/produtoController.js';
import auth from '../middlewares/auth.js';
const router = express.Router();

router.get('/', produtoController.getAll);
router.post('/', auth, produtoController.create);
router.put('/:id', auth, produtoController.update);
router.patch('/:id', auth, produtoController.update);
router.delete('/:id', auth, produtoController.delete);

export default router;
