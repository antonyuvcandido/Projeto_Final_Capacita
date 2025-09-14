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
