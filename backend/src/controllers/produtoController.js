import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const produtoController = {
  async getAll(req, res) {
    const produtos = await prisma.produto.findMany({ include: { categoria: true } });
    res.json(produtos);
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

export default produtoController;
