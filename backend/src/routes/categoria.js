import express from 'express';
import categoriaController from '../controllers/categoriaController.js';
const router = express.Router();

router.get('/', categoriaController.getAll);

export default router;
