import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// POST /users - Criar usuário
router.post('/', userController.create);

// POST /users/login - Login de usuário
router.post('/login', userController.login);

// GET /users - Listar usuários
router.get('/', userController.getAll);

// GET /users/:id - Buscar usuário por ID
router.get('/:id', userController.getById);

// PUT /users/:id - Atualizar usuário
router.put('/:id', userController.update);

// DELETE /users/:id - Deletar usuário
router.delete('/:id', userController.delete);

export default router;
