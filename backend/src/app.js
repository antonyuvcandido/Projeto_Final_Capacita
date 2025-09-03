import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
import usuarioRoutes from './routes/usuario.js';
import produtoRoutes from './routes/produto.js';
import categoriaRoutes from './routes/categoria.js';
import carrinhoRoutes from './routes/carrinho.js';
import itemCarrinhoRoutes from './routes/itemCarrinho.js';
import transacaoRoutes from './routes/transacao.js';

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/carrinhos', carrinhoRoutes);
app.use('/api/itens-carrinho', itemCarrinhoRoutes);
app.use('/api/transacoes', transacaoRoutes);

export default app;
