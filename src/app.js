const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use(express.json());
app.use('/api', usuarioRoutes);

module.exports = app;
