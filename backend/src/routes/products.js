import express from 'express';
import productController from '../controllers/productController.js';
import upload from '../middleware/upload.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Operações relacionadas a produtos
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *             examples:
 *               exemplo:
 *                 value:
 *                   - id: "prod1"
 *                     nome: "Notebook"
 *                     preco: 3500.99
 *                     quantidade: 10
 *                     descricao: "Notebook Dell Inspiron"
 *                     idCategoria: "cat1"
 *                   - id: "prod2"
 *                     nome: "Camiseta"
 *                     preco: 49.90
 *                     quantidade: 50
 *                     descricao: "Camiseta algodão"
 *                     idCategoria: "cat2"
 */
router.get('/', productController.getAll);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Busca produto por ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "prod1"
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: "prod1"
 *                   nome: "Notebook"
 *                   preco: 3500.99
 *                   quantidade: 10
 *                   descricao: "Notebook Dell Inspiron"
 *                   idCategoria: "cat1"
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:id', productController.getById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - preco
 *               - quantidade
 *               - descricao
 *               - idCategoria
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Notebook"
 *               preco:
 *                 type: number
 *                 example: 3500.99
 *               quantidade:
 *                 type: integer
 *                 example: 10
 *               descricao:
 *                 type: string
 *                 example: "Notebook Dell Inspiron"
 *               imagem:
 *                type: string
 *                example: "/uploads/produtos/notebook.jpg"
 *               idCategoria:
 *                 type: string
 *                 example: "cat1"
 *     responses:
 *       201:
 *         description: Produto criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: "prod1"
 *                   nome: "Notebook"
 *                   preco: 3500.99
 *                   quantidade: 10
 *                   descricao: "Notebook Dell Inspiron"
 *                   imagem: "/uploads/produtos/notebook.jpg"
 *                   idCategoria: "cat1"
 *       400:
 *         description: Erro de validação
 */
router.post('/', upload.single('imagem'), productController.create);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "prod1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Notebook"
 *               preco:
 *                 type: number
 *                 example: 3500.99
 *               quantidade:
 *                 type: integer
 *                 example: 10
 *               descricao:
 *                 type: string
 *                 example: "Notebook Dell Inspiron"
 *               idCategoria:
 *                 type: string
 *                 example: "cat1"
 *     responses:
 *       200:
 *         description: Produto atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: "prod1"
 *                   nome: "Notebook"
 *                   preco: 3500.99
 *                   quantidade: 10
 *                   descricao: "Notebook Dell Inspiron"
 *                   idCategoria: "cat1"
 *       400:
 *         description: Erro de validação
 */
router.put('/:id', upload.single('imagem'), productController.update);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Remove um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "prod1"
 *     responses:
 *       204:
 *         description: Produto removido
 *       400:
 *         description: Erro ao remover
 */
router.delete('/:id', productController.delete);

export default router;
