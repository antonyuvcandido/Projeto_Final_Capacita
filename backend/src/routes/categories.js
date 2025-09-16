import express from 'express';
import categoryController from '../controllers/categoryController.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Operações relacionadas a categorias
 */

/**
* @swagger
* /api/categories/many:
*   post:
*     summary: Cria uma lista de categorias
*     tags: [Categorias]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - nome
*               - descricao
*             properties:
*               nome:
*                 type: string
*                 example: "Eletrônicos"
*               descricao:
*                 type: string
*                 example: "Produtos eletrônicos em geral"
*     responses:
*       201:
*         description: Categorias criadas
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Categoria'
*             examples:
*               exemplo:
*                 value:
*                   id: "cat1"
*                   nome: "Eletrônicos"
*                   descricao: "Produtos eletrônicos em geral"
*       400:
*         description: Erro de validação
*/
router.post('/many', categoryController.createmany);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 *             examples:
 *               exemplo:
 *                 value:
 *                   - id: "cat1"
 *                     nome: "Eletrônicos"
 *                     descricao: "Produtos eletrônicos em geral"
 *                   - id: "cat2"
 *                     nome: "Roupas"
 *                     descricao: "Vestuário masculino e feminino"
 */
router.get('/', categoryController.getAll);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Busca categoria por ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "cat1"
 *     responses:
 *       200:
 *         description: Categoria encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: "cat1"
 *                   nome: "Eletrônicos"
 *                   descricao: "Produtos eletrônicos em geral"
 *       404:
 *         description: Categoria não encontrada
 */
router.get('/:id', categoryController.getById);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - descricao
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Eletrônicos"
 *               descricao:
 *                 type: string
 *                 example: "Produtos eletrônicos em geral"
 *     responses:
 *       201:
 *         description: Categoria criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: "cat1"
 *                   nome: "Eletrônicos"
 *                   descricao: "Produtos eletrônicos em geral"
 *       400:
 *         description: Erro de validação
 */
router.post('/', categoryController.create);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Atualiza uma categoria
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "cat1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Eletrônicos"
 *               descricao:
 *                 type: string
 *                 example: "Produtos eletrônicos em geral"
 *     responses:
 *       200:
 *         description: Categoria atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: "cat1"
 *                   nome: "Eletrônicos"
 *                   descricao: "Produtos eletrônicos em geral"
 *       400:
 *         description: Erro de validação
 */
router.put('/:id', categoryController.update);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Remove uma categoria
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "cat1"
 *     responses:
 *       204:
 *         description: Categoria removida
 *       400:
 *         description: Erro ao remover
 */
router.delete('/:id', categoryController.delete);

export default router;
