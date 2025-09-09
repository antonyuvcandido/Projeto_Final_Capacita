import express from 'express';
import categoryController from '../controllers/categoryController.js';

const router = express.Router();

// POST /categories - Criar categoria
router.post('/', categoryController.create);

// GET /categories - Listar categorias
router.get('/', categoryController.getAll);

// GET /categories/:id/products - Produtos por categoria
router.get('/:id/products', categoryController.getProductsByCategory);

// PUT /categories/:id - Atualizar categoria
router.put('/:id', categoryController.update);

// DELETE /categories/:id - Deletar categoria
router.delete('/:id', categoryController.delete);

export default router;
