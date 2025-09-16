import express from 'express';
import addressController from '../controllers/addressController.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Endereços
 *   description: Operações relacionadas a endereços
 */

/**
 * @swagger
 * /api/address:
 *   get:
 *     summary: Lista todos os endereços
 *     tags: [Endereços]
 *     responses:
 *       200:
 *         description: Lista de endereços
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Endereco'
 *             examples:
 *               exemplo:
 *                 value:
 *                   - id: "end1"
 *                     logradouro: "Rua A"
 *                     numero: "123"
 *                     bairro: "Centro"
 *                     cidade: "São Paulo"
 *                     estado: "SP"
 *                     CEP: "01000-000"
 *                     pais: "Brasil"
 *                     idUsuario: "user1"
 */
router.get('/', addressController.getAll);

/**
 * @swagger
 * /api/address/{id}:
 *   get:
 *     summary: Busca endereço por ID
 *     tags: [Endereços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "end1"
 *     responses:
 *       200:
 *         description: Endereço encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Endereco'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: "end1"
 *                   logradouro: "Rua A"
 *                   numero: "123"
 *                   bairro: "Centro"
 *                   cidade: "São Paulo"
 *                   estado: "SP"
 *                   CEP: "01000-000"
 *                   pais: "Brasil"
 *                   idUsuario: "user1"
 *       404:
 *         description: Endereço não encontrado
 */
router.get('/:id', addressController.getById);

/**
 * @swagger
 * /api/address:
 *   post:
 *     summary: Cria um novo endereço
 *     tags: [Endereços]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - logradouro
 *               - numero
 *               - bairro
 *               - cidade
 *               - estado
 *               - CEP
 *               - pais
 *             properties:
 *               logradouro:
 *                 type: string
 *                 example: "Rua A"
 *               numero:
 *                 type: string
 *                 example: "123"
 *               bairro:
 *                 type: string
 *                 example: "Centro"
 *               cidade:
 *                 type: string
 *                 example: "São Paulo"
 *               estado:
 *                 type: string
 *                 example: "SP"
 *               CEP:
 *                 type: string
 *                 example: "01000-000"
 *               pais:
 *                 type: string
 *                 example: "Brasil"
 *     responses:
 *       201:
 *         description: Endereço criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Endereco'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: "end1"
 *                   logradouro: "Rua A"
 *                   numero: "123"
 *                   bairro: "Centro"
 *                   cidade: "São Paulo"
 *                   estado: "SP"
 *                   CEP: "01000-000"
 *                   pais: "Brasil"
 *                   idUsuario: "user1"
 *       400:
 *         description: Erro de validação
 */
router.post('/', addressController.create);

/**
 * @swagger
 * /api/address/{id}:
 *   put:
 *     summary: Atualiza um endereço
 *     tags: [Endereços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "end1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               logradouro:
 *                 type: string
 *                 example: "Rua A"
 *               numero:
 *                 type: string
 *                 example: "123"
 *               bairro:
 *                 type: string
 *                 example: "Centro"
 *               cidade:
 *                 type: string
 *                 example: "São Paulo"
 *               estado:
 *                 type: string
 *                 example: "SP"
 *               CEP:
 *                 type: string
 *                 example: "01000-000"
 *               pais:
 *                 type: string
 *                 example: "Brasil"
 *     responses:
 *       200:
 *         description: Endereço atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Endereco'
 *             examples:
 *               exemplo:
 *                 value:
 *                   id: "end1"
 *                   logradouro: "Rua A"
 *                   numero: "123"
 *                   bairro: "Centro"
 *                   cidade: "São Paulo"
 *                   estado: "SP"
 *                   CEP: "01000-000"
 *                   pais: "Brasil"
 *                   idUsuario: "user1"
 *       400:
 *         description: Erro de validação
 */
router.put('/:id', addressController.update);

/**
 * @swagger
 * /api/address/{id}:
 *   delete:
 *     summary: Remove um endereço
 *     tags: [Endereços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "end1"
 *     responses:
 *       204:
 *         description: Endereço removido
 *       400:
 *         description: Erro ao remover
 */
router.delete('/:id', addressController.delete);

export default router;
