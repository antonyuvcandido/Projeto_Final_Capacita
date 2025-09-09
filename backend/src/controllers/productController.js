import prisma from '../lib/prisma.js';

const productController = {
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

  async create(req, res) {
    const { nome, preco, quantidade, descricao, idCategoria } = req.body;
    try {
      const produto = await prisma.produto.create({
        data: { nome, preco, quantidade, descricao, idCategoria }
      });
      res.status(201).json(produto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const produto = await prisma.produto.update({
        where: { id },
        data
      });
      res.json(produto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

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
