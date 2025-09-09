import prisma from '../lib/prisma.js';

const orderController = {
  async getAll(req, res) {
    try {
      const transacoes = await prisma.transacao.findMany({
        include: {
          usuario: {
            select: {
              nome: true,
              email: true
            }
          },
          carrinho: {
            include: {
              itens: {
                include: {
                  produto: true
                }
              }
            }
          }
        }
      });
      res.json(transacoes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const transacao = await prisma.transacao.findUnique({
        where: { id: req.params.id },
        include: {
          usuario: {
            select: {
              nome: true,
              email: true
            }
          },
          carrinho: {
            include: {
              itens: {
                include: {
                  produto: true
                }
              }
            }
          }
        }
      });
      if (!transacao) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }
      res.json(transacao);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    const { idCarrinho } = req.body;
    try {
      const carrinho = await prisma.carrinho.findUnique({
        where: { id: idCarrinho },
        include: {
          itens: {
            include: {
              produto: true
            }
          }
        }
      });

      if (!carrinho) {
        return res.status(404).json({ error: 'Carrinho não encontrado' });
      }

      // Calcula o valor total do pedido
      const valorTotal = carrinho.itens.reduce((total, item) => {
        return total + (item.quantidade * item.produto.preco);
      }, 0);

      const transacao = await prisma.transacao.create({
        data: {
          idCarrinho,
          idUsuario: carrinho.IdUsuario,
          valorTotal
        }
      });

      res.status(201).json(transacao);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const transacao = await prisma.transacao.update({
        where: { id },
        data: { status }
      });
      res.json(transacao);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export default orderController;
