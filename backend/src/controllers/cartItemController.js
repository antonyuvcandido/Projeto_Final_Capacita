import prisma from '../lib/prisma.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemCarrinho:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "item1"
 *         idCarrinho:
 *           type: string
 *           example: "cart1"
 *         idProduto:
 *           type: string
 *           example: "prod1"
 *         quantidade:
 *           type: integer
 *           example: 2
 */

const cartItemController = {
  async create(req, res) {
    const { idCarrinho, idProduto, quantidade } = req.body;
    try {
      // Verificar se o produto existe e tem estoque suficiente
      const produto = await prisma.produto.findUnique({
        where: { id: idProduto }
      });

      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      if (produto.quantidade < quantidade) {
        return res.status(400).json({ error: 'Estoque insuficiente' });
      }

      // Verificar se o item já existe no carrinho
      const itemExistente = await prisma.itemCarrinho.findFirst({
        where: {
          idCarrinho,
          idProduto
        }
      });

      let item;
      if (itemExistente) {
        // Se já existe, atualizar a quantidade
        const novaQuantidade = itemExistente.quantidade + quantidade;

        if (produto.quantidade < novaQuantidade) {
          return res.status(400).json({ error: 'Estoque insuficiente para a quantidade total' });
        }

        item = await prisma.itemCarrinho.update({
          where: { id: itemExistente.id },
          data: { quantidade: novaQuantidade },
          include: {
            produto: {
              include: {
                categoria: true
              }
            }
          }
        });
      } else {
        // Se não existe, criar novo item
        item = await prisma.itemCarrinho.create({
          data: { idCarrinho, idProduto, quantidade },
          include: {
            produto: {
              include: {
                categoria: true
              }
            }
          }
        });
      }

      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async addToCartByUserId(req, res) {
    const { userId } = req.params;
    const { idProduto, quantidade } = req.body;

    try {
      // Buscar o carrinho do usuário
      const carrinho = await prisma.carrinho.findUnique({
        where: { idUsuario: userId }
      });

      if (!carrinho) {
        return res.status(404).json({ error: 'Carrinho não encontrado para este usuário' });
      }

      // Usar a função create existente
      req.body.idCarrinho = carrinho.id;
      return cartItemController.create(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const item = await prisma.itemCarrinho.update({
        where: { id },
        data,
        include: {
          produto: {
            include: {
              categoria: true
            }
          }
        }
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

export default cartItemController;