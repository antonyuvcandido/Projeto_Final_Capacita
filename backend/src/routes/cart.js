import express from 'express';
import cartController from '../controllers/cartController.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Carrinho
 *   description: Operações relacionadas ao carrinho de compras
 */

/**
 * @swagger
 * /api/carts/{id}:
 *   get:
 *     summary: Busca carrinho por ID
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "cart1"
 *     responses:
 *       200:
 *         description: Carrinho encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carrinho'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: "cart1"
 *                   idUsuario: "user1"
 *       404:
 *         description: Carrinho não encontrado
 */
router.get('/:id', cartController.getById);

/**
 * @swagger
 * /api/carts/user/{userId}:
 *   get:
 *     summary: Busca carrinho por ID do usuário
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: "user1"
 *     responses:
 *       200:
 *         description: Carrinho encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carrinho'
 *       404:
 *         description: Carrinho não encontrado
 */
router.get('/user/:userId', cartController.getByUserId);

/** 
 * @swagger
 * /api/carts:
 *   post:
 *     summary: Cria um carrinho para o usuário caso não exista
 *     tags: [Carrinho]
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUsuario:
 *                 type: string
 *                 example: "user1"
 *     responses:
 *       201:
 *         description: Carrinho criado
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Carrinho'
 *             examples:
 *               exemplo:
 *                value:
 *                 id: "cart1"
 *                 idUsuario: "user1"
 *       400:
 *         description: Erro de validação
 */
router.post('/', cartController.create);

/**
 * @swagger
 * /api/carts/{id}:
 *   put:
 *     summary: Atualiza um carrinho
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "cart1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUsuario:
 *                 type: string
 *                 example: "user1"
 *     responses:
 *       200:
 *         description: Carrinho atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carrinho'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: "cart1"
 *                   idUsuario: "user1"
 *       400:
 *         description: Erro de validação
 */
router.put('/:id', cartController.update);

/**
 * @swagger
 * /api/carts/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um carrinho
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "cart1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUsuario:
 *                 type: string
 *                 example: "user1"
 *     responses:
 *       200:
 *         description: Carrinho atualizado parcialmente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carrinho'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: "cart1"
 *                   idUsuario: "user1"
 *       400:
 *         description: Erro de validação
 */
router.patch('/:id', cartController.update);

export default router;