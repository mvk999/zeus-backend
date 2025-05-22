
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// IMPORTANDO AS ROTAS
const membroRoutes = require('./routes/membroRoutes');
const orcamentoRoutes = require('./routes/orcamentoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

// USANDO AS ROTAS
app.use('/api', usuarioRoutes);
app.use('/api', membroRoutes);
app.use('/api', orcamentoRoutes);
app.use('/api', clienteRoutes);

module.exports = app;