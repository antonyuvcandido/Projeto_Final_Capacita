import express from 'express';
import transacaoController from '../controllers/transacaoController.js';
const router = express.Router();

router.get('/', transacaoController.getAll);
router.post('/', transacaoController.create);

export default router;
