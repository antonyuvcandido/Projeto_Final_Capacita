import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const transacaoController = {
  async getAll(req, res) {
    const transacoes = await prisma.transacao.findMany({ include: { usuario: true, carrinho: true } });
    res.json(transacoes);
  },
  async create(req, res) {
    const { idCarrinho, idUsuario, valorTotal } = req.body;
    try {
      const transacao = await prisma.transacao.create({
        data: { idCarrinho, idUsuario, valorTotal }
      });
      res.status(201).json(transacao);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export default transacaoController;
