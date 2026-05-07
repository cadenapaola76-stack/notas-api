import 'dotenv/config';
import express from 'express';
import cors from 'cors'; 
import 'express-async-errors';
import morgan from 'morgan';
import { loggerMiddleware } from './presentation/middlewares/logger.middleware.js';
import noteRoutes from './presentation/routes/note.routes.js';
import authRoutes from './presentation/routes/auth.routes.js';
import categoryRoutes from './presentation/routes/category.routes.js';

import { connectMongo } from './infrastructure/database/mongo/connection.js';
import { connectMysql } from './infrastructure/database/mysql/connection.js';
import { setupSwagger } from './infrastructure/config/swagger.config.js';

await connectMongo();
await connectMysql();

const indexapp = express();

indexapp.use(cors());
indexapp.use(express.json());
//setupSwagger(indexapp);
//indexapp.use(loggerMiddleware);
indexapp.use(morgan('dev'));

//imagenes estaticas

indexapp.use('/uploads', express.static('uploads'));
indexapp.use('/api/v1/auth', authRoutes);
indexapp.use('/api/v1/notes',noteRoutes);
indexapp.use('/api/v1/category', categoryRoutes);

indexapp.get('/api/health', (req, res) => {

    res.status(200).json({ status: 'OK',message: 'API de notas activa' });

});

//midleware de manejo de errores global

indexapp.use((err, req, res, next) => {

    console.error(err.stack);

res.status(500).json({ error: 'Error interno del servidor' });

});


export default indexapp;