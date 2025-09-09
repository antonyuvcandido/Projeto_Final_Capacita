import prisma from '../lib/prisma.js';

const cartController = {
  async getById(req, res) {
    const { id } = req.params;
    const cart = await prisma.carrinho.findUnique({
      where: { id },
      include: { itens: { include: { produto: true } } }
    });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    res.json(cart);
  },
  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const cart = await prisma.carrinho.update({
        where: { id },
        data
      });
      res.json(cart);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export default cartController;