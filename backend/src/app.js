import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Swagger
import { swaggerUi, swaggerSpec } from './swagger.js';
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
import usersRoutes from './routes/users.js';
import productsRoutes from './routes/products.js';
import categoriesRoutes from './routes/categories.js';
import ordersRoutes from './routes/orders.js';
import cartRoutes from './routes/cart.js';
import cartItemRoutes from './routes/cartItem.js';
import addressRoutes from './routes/address.js';

app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/cart-items', cartItemRoutes);
app.use('/api/address', addressRoutes);

export default app;
