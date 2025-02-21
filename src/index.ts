require('dotenv').config();
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import logger from './config/winston';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import movementRoutes from './routes/movements.routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/users', userRoutes);
app.use('/login', authRoutes);
app.use('/products', productRoutes);
app.use('/movements', movementRoutes);

AppDataSource.initialize()
  .then(async () => {
    logger.info('Conectado com sucesso ao banco de dados');
  })
  .catch(() => logger.error('Erro ao conectar ao banco de dados'));

app.listen(3333, () => {
  logger.info('Servidor rodando na porta 3333');
});
