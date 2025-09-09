import prisma from '../lib/prisma.js';

const categoryController = {
  async getAll(req, res) {
    try {
      const categorias = await prisma.categoria.findMany();
      res.json(categorias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

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
  }
};

export default categoryController;
