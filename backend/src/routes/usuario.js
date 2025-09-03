import express from 'express';
import usuarioController from '../controllers/usuarioController.js';
const router = express.Router();


router.get('/', usuarioController.getAll);
router.post('/', usuarioController.create);
router.put('/:id', usuarioController.update);
router.patch('/:id', usuarioController.update);
router.delete('/:id', usuarioController.delete);
router.post('/login', usuarioController.login);

export default router;
