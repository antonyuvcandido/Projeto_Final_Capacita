import prisma from '../lib/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userController = {
  async getAll(req, res) {
    try {
      const usuarios = await prisma.usuario.findMany({
        select: {
          id: true,
          nome: true,
          email: true,
          admin: true,
          criadoEm: true,
          editadoEm: true
        }
      });
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { id: req.params.id },
        select: {
          id: true,
          nome: true,
          email: true,
          admin: true,
          criadoEm: true,
          editadoEm: true,
          endereco: true
        }
      });
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    const { nome, email, senha, admin } = req.body;
    try {
      const hash = await bcrypt.hash(senha, 10);
      const usuario = await prisma.usuario.create({
        data: { 
          nome, 
          email, 
          senha: hash, 
          admin,
          carrinho: {
            create: {}
          }
        }
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
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email, admin: usuario.admin }, 
        process.env.JWT_SECRET || 'segredo', 
        { expiresIn: '1d' }
      );
      res.json({ 
        token,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          admin: usuario.admin
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao autenticar' });
    }
  }
};

export default userController;
