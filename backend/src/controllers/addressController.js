import prisma from '../lib/prisma.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Endereco:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "end1"
 *         logradouro:
 *           type: string
 *           example: "Rua A"
 *         numero:
 *           type: string
 *           example: "123"
 *         bairro:
 *           type: string
 *           example: "Centro"
 *         cidade:
 *           type: string
 *           example: "São Paulo"
 *         estado:
 *           type: string
 *           example: "SP"
 *         CEP:
 *           type: string
 *           example: "01000-000"
 *         pais:
 *           type: string
 *           example: "Brasil"
 *         idUsuario:
 *           type: string
 *           example: "user1"
 */

const addressController = {

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
     */
    async getAll(req, res) {
        try {
            const enderecos = await prisma.endereco.findMany();
            res.status(200).json(enderecos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

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
     *       404:
     *         description: Endereço não encontrado
     */
    async getById(req, res) {
        const { id } = req.params;
        try {
            const endereco = await prisma.endereco.findUnique({
                where: { id }
            });
            if (!endereco) {
                return res.status(404).json({ error: 'Endereço não encontrado' });
            }
            res.status(200).json(endereco);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

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
     *       400:
     *         description: Erro de validação
     */
    async create(req, res) {
        const idUsuario = req.body.idUsuario;
        const { logradouro, numero, bairro, cidade, estado, CEP, pais } = req.body;
        try {
            const endereco = await prisma.endereco.create({
                data: { 
                    logradouro,
                    numero,
                    bairro,
                    cidade,
                    estado,
                    CEP,
                    pais,
                    idUsuario
                }
            });
        if(!idUsuario){
                return res.status(404).json({ error: 'Usuário não encontrado' });
        }
            res.status(201).json(endereco);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

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
     *       400:
     *         description: Erro de validação
     */
    async update(req, res) {
        const { id } = req.params;
        const { logradouro, numero, bairro, cidade, estado, CEP, pais } = req.body;
        try {
            const endereco = await prisma.endereco.update({
                where: { id },
                data: { logradouro, numero, bairro, cidade, estado, CEP, pais }
            });
            res.status(200).json(endereco);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

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
    async delete(req, res) {
        const { id } = req.params;
        try {
            await prisma.endereco.delete({ where: { id } });
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

};

export default addressController;

