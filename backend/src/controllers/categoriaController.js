import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const categoriaController = {
  async getAll(req, res) {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
  }
};

export default categoriaController;
