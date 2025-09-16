import prisma from '../lib/prisma.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "prod1"
 *         nome:
 *           type: string
 *           example: "Notebook"
 *         preco:
 *           type: number
 *           example: 3500.99
 *         quantidade:
 *           type: integer
 *           example: 10
 *         descricao:
 *           type: string
 *           example: "Notebook Dell Inspiron"
 *         idCategoria:
 *           type: string
 *           example: "cat1"
 */

const productController = {
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
   */
  async getAll(req, res) {
    try {
      const produtos = await prisma.produto.findMany({
        include: { categoria: true }
      });
      res.json(produtos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

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
   *     responses:
   *       200:
   *         description: Produto encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Produto'
   *       404:
   *         description: Produto não encontrado
   */
  async getById(req, res) {
    try {
      const produto = await prisma.produto.findUnique({
        where: { id: req.params.id },
        include: { categoria: true }
      });
      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.json(produto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

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
   *               preco:
   *                 type: number
   *               quantidade:
   *                 type: integer
   *               descricao:
   *                 type: string
   *               idCategoria:
   *                 type: string
   *     responses:
   *       201:
   *         description: Produto criado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Produto'
   *       400:
   *         description: Erro de validação
   */
  async create(req, res) {
    const { nome, preco, quantidade, descricao, idCategoria } = req.body;
    try {
      const dadosProduto = {
        nome,
        preco: parseFloat(preco),
        quantidade: parseInt(quantidade),
        descricao,
        idCategoria
      };

      // Se uma imagem foi enviada, adiciona o caminho ao produto
      if (req.file) {
        dadosProduto.imagem = `/uploads/produtos/${req.file.filename}`;
      }

      const produto = await prisma.produto.create({
        data: dadosProduto
      });
      res.status(201).json(produto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

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
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *               preco:
   *                 type: number
   *               quantidade:
   *                 type: integer
   *               descricao:
   *                 type: string
   *               idCategoria:
   *                 type: string
   *     responses:
   *       200:
   *         description: Produto atualizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Produto'
   *       400:
   *         description: Erro de validação
   */
  async update(req, res) {
    const { id } = req.params;
    const { nome, preco, quantidade, descricao, idCategoria } = req.body;
    try {
      const data = { nome, descricao, idCategoria };
      if (preco) data.preco = parseFloat(preco);
      if (quantidade) data.quantidade = parseInt(quantidade);

      // Se uma nova imagem foi enviada, adiciona o caminho ao produto
      if (req.file) {
        data.imagem = `/uploads/produtos/${req.file.filename}`;
      }

      const produto = await prisma.produto.update({
        where: { id },
        data
      });
      res.json(produto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

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
   *     responses:
   *       204:
   *         description: Produto removido
   *       400:
   *         description: Erro ao remover
   */
  async delete(req, res) {
    const { id } = req.params;
    try {
      await prisma.produto.delete({ where: { id } });
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export default productController;
