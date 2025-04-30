console.log('Debug Log')

// Carrega variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importa bibliotecas
const express = require('express');
const morgan = require('morgan');

// Importa conexão com banco de dados e rotas
const connectDB = require('./database/mongo');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

// Inicializa o servidor Express
const app = express();

// Middlewares globais
app.use(express.json()); // Permite trabalhar com JSON no body
app.use(morgan('dev'));  // Loga as requisições no console

const timeout = require('connect-timeout');
app.use(timeout(5000));  // 5000 ms = 5 seconds

// Handle request timeout
app.use(function (req, res, next) {
    if (!req.timedout) {
        next();
    } else {
        res.status(408).send('Request Timeout');
    }
});

// Conecta ao MongoDB
connectDB();

// Usa as rotas de autenticação e rotas protegidas
app.use('/api', authRoutes);
app.use('/api', protectedRoutes);

// Exporta o app para ser usado como uma função serverless
module.exports = app;
