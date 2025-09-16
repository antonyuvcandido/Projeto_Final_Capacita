import express from 'express';
import cartItemController from '../controllers/cartItemController.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ItemCarrinho
 *   description: Operações relacionadas aos itens do carrinho
 */

/**
 * @swagger
 * /api/cart-items:
 *   post:
 *     summary: Adiciona um item ao carrinho
 *     tags: [ItemCarrinho]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idCarrinho
 *               - idProduto
 *               - quantidade
 *             properties:
 *               idCarrinho:
 *                 type: string
 *                 example: "cart1"
 *               idProduto:
 *                 type: string
 *                 example: "prod1"
 *               quantidade:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Item adicionado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemCarrinho'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: "item1"
 *                   idCarrinho: "cart1"
 *                   idProduto: "prod1"
 *                   quantidade: 2
 *       400:
 *         description: Erro de validação
 */
router.post('/', cartItemController.create);

/**
 * @swagger
 * /api/cart-items/user/{userId}:
 *   post:
 *     summary: Adiciona um item ao carrinho do usuário
 *     tags: [ItemCarrinho]
 *     parameters:
 *       - in: path
 *         name: userId
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
 *             required:
 *               - idProduto
 *               - quantidade
 *             properties:
 *               idProduto:
 *                 type: string
 *                 example: "prod1"
 *               quantidade:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Item adicionado
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Carrinho não encontrado
 */
router.post('/user/:userId', cartItemController.addToCartByUserId);

/**
 * @swagger
 * /api/cart-items/{id}:
 *   put:
 *     summary: Atualiza um item do carrinho
 *     tags: [ItemCarrinho]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "item1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantidade:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Item atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemCarrinho'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: "item1"
 *                   idCarrinho: "cart1"
 *                   idProduto: "prod1"
 *                   quantidade: 3
 *       400:
 *         description: Erro de validação
 */
router.put('/:id', cartItemController.update);

/**
 * @swagger
 * /api/cart-items/{id}:
 *   delete:
 *     summary: Remove um item do carrinho
 *     tags: [ItemCarrinho]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "item1"
 *     responses:
 *       204:
 *         description: Item removido
 *       400:
 *         description: Erro ao remover
 */
router.delete('/:id', cartItemController.delete);

export default router;