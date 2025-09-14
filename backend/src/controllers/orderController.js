import prisma from '../lib/prisma.js';

/**
 * @swagger
 * tags:
 *   name: Transações
 *   description: Operações relacionadas a transações
 * components:
 *   schemas:
 *     Transacao:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "ord1"
 *         idCarrinho:
 *           type: string
 *           example: "cart1"
 *         idUsuario:
 *           type: string
 *           example: "user1"
 *         valorTotal:
 *           type: number
 *           example: 3599.99
 *         status:
 *           type: string
 *           example: "finalizado"
 */

const orderController = {
  /**
   * @swagger
   * /api/orders:
   *   get:
   *     summary: Lista todas as transações
   *     tags: [Transações]
   *     responses:
   *       200:
   *         description: Lista de transações
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Transacao'
   */
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

  /**
   * @swagger
   * /api/orders/{id}:
   *   get:
   *     summary: Busca transação por ID
   *     tags: [Transações]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Transação encontrada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Transacao'
   *       404:
   *         description: Transação não encontrada
   */
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

  /**
   * @swagger
   * /api/orders:
   *   post:
   *     summary: Cria uma nova transação
   *     tags: [Transações]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - idCarrinho
   *             properties:
   *               idCarrinho:
   *                 type: string
   *                 example: "cart1"
   *     responses:
   *       201:
   *         description: Transação criada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Transacao'
   *       400:
   *         description: Erro de validação
   */
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

  /**
   * @swagger
   * /api/orders/{id}/status:
   *   patch:
   *     summary: Atualiza o status da transação
   *     tags: [Transações]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - status
   *             properties:
   *               status:
   *                 type: string
   *     responses:
   *       200:
   *         description: Status atualizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Transacao'
   *       400:
   *         description: Erro ao atualizar
   */
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
