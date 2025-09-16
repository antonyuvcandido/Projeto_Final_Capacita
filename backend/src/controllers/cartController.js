import prisma from '../lib/prisma.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Carrinho:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "cart1"
 *         idUsuario:
 *           type: string
 *           example: "user1"
 */

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