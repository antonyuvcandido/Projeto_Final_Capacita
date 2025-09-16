import prisma from '../lib/prisma.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "cat1"
 *         nome:
 *           type: string
 *           example: "Eletrônicos"
 *         descricao:
 *           type: string
 *           example: "Produtos eletrônicos em geral"
 */

const categoryController = {
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
  async getAll(req, res) {
    try {
      const categorias = await prisma.categoria.findMany();
      res.json(categorias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

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
  async getById(req, res) {
    try {
      const categoria = await prisma.categoria.findUnique({
        where: { id: req.params.id }
      });
      if (!categoria) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }
      res.json(categoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


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
  async create(req, res) {
    const { nome, descricao } = req.body;
    try {
      const categoria = await prisma.categoria.create({
        data: { nome, descricao }
      });
      res.status(201).json(categoria);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  
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
  async createmany(req, res) {
    const categorias = req.body;
    try {
      const createdCategorias = await prisma.categoria.createMany({
        data: categorias
      });
      res.status(201).json(createdCategorias);
    } catch (error) {
      res.status(400).json({ error: error.message });
    } 
  }, 
    
  /**
   * @swagger
   * /api/categories/{id}/products:
   *   get:
   *     summary: Busca de produtos por categoria
   *     tags: [Categorias]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         name: produtos
   *         required: false
   *         schema:
   *           type: string
   *         example: "cat1"
   *         type: object
   *         example: "{ "id": "prod1", "nome": "Notebook", "preco": 3500.99, "quantidade": 10, "descricao": "Notebook Dell Inspiron", "idCategoria": "cat1"}"
   *     responses:
   *       200:
   *         description: Produtos da categoria buscada foram encontrados
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

  async getProductsByCategory(req, res) {
    try {
      const produtos = await prisma.produto.findMany({
        where: {
          idCategoria: req.params.id
        },
        include: {
          categoria: true
        }
      });
      res.json(produtos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
    

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
  async update(req, res) {
    const { nome, descricao } = req.body;
    try {
      const categoria = await prisma.categoria.update({
        where: { id: req.params.id },
        data: { nome, descricao }
      });
      res.json(categoria);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

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
  async delete(req, res) {
    try {
      await prisma.categoria.delete({
        where: { id: req.params.id }
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export default categoryController;
