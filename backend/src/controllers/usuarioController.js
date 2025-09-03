import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

const usuarioController = {
  async getAll(req, res) {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  },
  async create(req, res) {
    const { nome, email, senha, admin } = req.body;
    try {
      const hash = await bcrypt.hash(senha, 10);
      const usuario = await prisma.usuario.create({
        data: { nome, email, senha: hash, admin }
      });
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const data = { ...req.body };
    if (data.senha) {
      data.senha = await bcrypt.hash(data.senha, 10);
    }
    try {
      const usuario = await prisma.usuario.update({
        where: { id },
        data
      });
      res.json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    try {
      await prisma.usuario.delete({ where: { id } });
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async login(req, res) {
    const { email, senha } = req.body;
    try {
      const usuario = await prisma.usuario.findUnique({ where: { email } });
      if (!usuario) return res.status(401).json({ error: 'Usuário ou senha inválidos' });
      const valido = await bcrypt.compare(senha, usuario.senha);
      if (!valido) return res.status(401).json({ error: 'Usuário ou senha inválidos' });
      const token = jwt.sign({ id: usuario.id, email: usuario.email, admin: usuario.admin }, process.env.JWT_SECRET || 'segredo', { expiresIn: '1d' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao autenticar' });
    }
  }
};

export default usuarioController;
