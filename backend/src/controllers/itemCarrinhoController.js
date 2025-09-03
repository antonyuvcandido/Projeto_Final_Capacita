import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const itemCarrinhoController = {
  async create(req, res) {
    const { idCarrinho, idProduto, quantidade } = req.body;
    try {
      const item = await prisma.itemCarrinho.create({
        data: { idCarrinho, idProduto, quantidade }
      });
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const item = await prisma.itemCarrinho.update({
        where: { id },
        data
      });
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    try {
      await prisma.itemCarrinho.delete({ where: { id } });
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export default itemCarrinhoController;
