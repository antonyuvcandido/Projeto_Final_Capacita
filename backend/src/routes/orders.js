import express from 'express';
import orderController from '../controllers/orderController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transações
 *   description: Operações relacionadas a transações
 */

/**
 * @swagger
 * /api/transacoes:
 *   get:
 *     summary: Lista todas as transações
 *     tags: [Transações]
 *     responses:
 *       200:
 *         description: Lista de transações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transacao'
 *             examples:
 *               exemplo:
 *                 value:
 *                   - id: "ord1"
 *                     idCarrinho: "cart1"
 *                     idUsuario: "user1"
 *                     valorTotal: 3599.99
 *                     status: "finalizado"
 *                     criadoEm: "2024-06-01T12:00:00Z"
 *                   - id: "ord2"
 *                     idCarrinho: "cart2"
 *                     idUsuario: "user2"
 *                     valorTotal: 99.90
 *                     status: "pendente"
 *                     criadoEm: "2024-06-02T09:30:00Z"
 */
router.get('/', orderController.getAll);

/**
 * @swagger
 * /api/transacoes/{id}:
 *   get:
 *     summary: Busca transação por ID
 *     tags: [Transações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "ord1"
 *     responses:
 *       200:
 *         description: Transação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transacao'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: "ord1"
 *                   idCarrinho: "cart1"
 *                   idUsuario: "user1"
 *                   valorTotal: 3599.99
 *                   status: "finalizado"
 *                   criadoEm: "2024-06-01T12:00:00Z"
 *       404:
 *         description: Transação não encontrada
 */
router.get('/:id', orderController.getById);

/**
 * @swagger
 * /api/transacoes:
 *   post:
 *     summary: Cria uma nova transação
 *     tags: [Transações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idCarrinho
 *             properties:
 *               idCarrinho:
 *                 type: string
 *                 example: "cart1"
 *     responses:
 *       201:
 *         description: Transação criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transacao'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: "ord1"
 *                   idCarrinho: "cart1"
 *                   idUsuario: "user1"
 *                   valorTotal: 3599.99
 *                   status: "finalizado"
 *       400:
 *         description: Erro de validação
 */
router.post('/', orderController.create);

/**
 * @swagger
 * /api/transacoes/{id}/status:
 *   patch:
 *     summary: Atualiza o status da transação
 *     tags: [Transações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "ord1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: "finalizado"
 *     responses:
 *       200:
 *         description: Status atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transacao'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: "ord1"
 *                   idCarrinho: "cart1"
 *                   idUsuario: "user1"
 *                   valorTotal: 3599.99
 *                   status: "finalizado"
 *       400:
 *         description: Erro ao atualizar
 */
router.patch('/:id/status', orderController.updateStatus);

export default router;
