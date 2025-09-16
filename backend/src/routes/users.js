import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Operações relacionadas a usuários
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *             examples:
 *               exemplo:
 *                 value:
 *                   - id: "user1"
 *                     nome: "João Silva"
 *                     email: "joao@email.com"
 *                     admin: false
 *                     criadoEm: "2024-06-01T12:00:00Z"
 *                     editadoEm: "2024-06-01T12:00:00Z"
 *                   - id: "user2"
 *                     nome: "Maria Souza"
 *                     email: "maria@email.com"
 *                     admin: true
 *                     criadoEm: "2024-06-02T09:30:00Z"
 *                     editadoEm: "2024-06-02T09:30:00Z"
 */
router.get('/', userController.getAll);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Busca usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "user1"
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: "user1"
 *                   nome: "João Silva"
 *                   email: "joao@email.com"
 *                   admin: false
 *                   criadoEm: "2024-06-01T12:00:00Z"
 *                   editadoEm: "2024-06-01T12:00:00Z"
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', userController.getById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               senha:
 *                 type: string
 *                 example: "senha123"
 *               admin:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Usuário criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: "user1"
 *                   nome: "João Silva"
 *                   email: "joao@email.com"
 *                   admin: false
 *                   criadoEm: "2024-06-01T12:00:00Z"
 *                   editadoEm: "2024-06-01T12:00:00Z"
 *       400:
 *         description: Erro de validação
 */
router.post('/', userController.create);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "user1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               senha:
 *                 type: string
 *                 example: "novaSenha"
 *               admin:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: "user1"
 *                   nome: "João Silva"
 *                   email: "joao@email.com"
 *                   admin: false
 *                   criadoEm: "2024-06-01T12:00:00Z"
 *                   editadoEm: "2024-06-01T12:00:00Z"
 *       400:
 *         description: Erro de validação
 */
router.put('/:id', userController.update);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "user1"
 *     responses:
 *       204:
 *         description: Usuário removido
 *       400:
 *         description: Erro ao remover
 */
router.delete('/:id', userController.delete);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               senha:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "jwt.token.aqui"
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', userController.login);

export default router;
