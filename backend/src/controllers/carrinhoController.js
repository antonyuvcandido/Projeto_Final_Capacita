import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const carrinhoController = {
  async getById(req, res) {
    const { id } = req.params;
    const carrinho = await prisma.carrinho.findUnique({
      where: { id },
      include: { itens: { include: { produto: true } } }
    });
    if (!carrinho) return res.status(404).json({ error: 'Carrinho não encontrado' });
    res.json(carrinho);
  },
  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const carrinho = await prisma.carrinho.update({
        where: { id },
        data
      });
      res.json(carrinho);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export default carrinhoController;
