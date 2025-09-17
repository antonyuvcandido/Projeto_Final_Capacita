import prisma from '../lib/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "user1"
 *         nome:
 *           type: string
 *           example: "João Silva"
 *         email:
 *           type: string
 *           example: "joao@email.com"
 *         admin:
 *           type: boolean
 *           example: false
 *         criadoEm:
 *           type: string
 *           format: date-time
 *           example: "2024-06-01T12:00:00Z"
 *         editadoEm:
 *           type: string
 *           format: date-time
 *           example: "2024-06-01T12:00:00Z"
 */

const userController = {
  /**
   * @swagger
   * /api/users:
   *   get:
   *     summary: Lista todos os usuários
   *     tags: [Usuários]
   *     responses:
   *       200:
   *         description: Lista de usuários
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Usuario'
   */
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

  /**
   * @swagger
   * /api/users/{id}:
   *   get:
   *     summary: Busca usuário por ID
   *     tags: [Usuários]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Usuário encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Usuario'
   *       404:
   *         description: Usuário não encontrado
   */
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

  /**
   * @swagger
   * /api/users:
   *   post:
   *     summary: Cria um novo usuário
   *     tags: [Usuários]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nome
   *               - email
   *               - senha
   *             properties:
   *               nome:
   *                 type: string
   *               email:
   *                 type: string
   *               senha:
   *                 type: string
   *               admin:
   *                 type: boolean
   *     responses:
   *       201:
   *         description: Usuário criado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Usuario'
   *       400:
   *         description: Erro de validação
   */
  async create(req, res) {
    const { nome, email, senha, admin = false } = req.body;
    try {
      const hash = await bcrypt.hash(senha, 10);
      const usuario = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha: hash,
          admin
        }
      });

      // Criar carrinho separadamente
      await prisma.carrinho.create({
        data: {
          idUsuario: usuario.id
        }
      });

      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  /**
   * @swagger
   * /api/users/{id}:
   *   put:
   *     summary: Atualiza um usuário
   *     tags: [Usuários]
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
   *             properties:
   *               nome:
   *                 type: string
   *               email:
   *                 type: string
   *               senha:
   *                 type: string
   *               admin:
   *                 type: boolean
   *     responses:
   *       200:
   *         description: Usuário atualizado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Usuario'
   *       400:
   *         description: Erro de validação
   */
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

  /**
   * @swagger
   * /api/users/{id}:
   *   delete:
   *     summary: Remove um usuário
   *     tags: [Usuários]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: Usuário removido
   *       400:
   *         description: Erro ao remover
   */
  async delete(req, res) {
    const { id } = req.params;
    try {
      await prisma.usuario.delete({ where: { id } });
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  /**
   * @swagger
   * /api/users/login:
   *   post:
   *     summary: Realiza login do usuário
   *     tags: [Usuários]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - senha
   *             properties:
   *               email:
   *                 type: string
   *               senha:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login realizado
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                 usuario:
   *                   $ref: '#/components/schemas/Usuario'
   *       401:
   *         description: Credenciais inválidas
   */
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
