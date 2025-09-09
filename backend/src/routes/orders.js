import express from 'express';
import orderController from '../controllers/orderController.js';

const router = express.Router();

// POST /orders - Criar pedido
router.post('/', orderController.create);

// GET /orders - Listar pedidos
router.get('/', orderController.getAll);

// GET /orders/:id - Buscar pedido por ID
router.get('/:id', orderController.getById);

// PUT /orders/:id/status - Atualizar status do pedido
router.put('/:id/status', orderController.updateStatus);

export default router;
