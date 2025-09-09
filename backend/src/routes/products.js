import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

// POST /products - Criar produto
router.post('/', productController.create);

// GET /products - Listar produtos
router.get('/', productController.getAll);

// GET /products/:id - Buscar produto por ID
router.get('/:id', productController.getById);

// PUT /products/:id - Atualizar produto
router.put('/:id', productController.update);

// DELETE /products/:id - Deletar produto
router.delete('/:id', productController.delete);

export default router;
