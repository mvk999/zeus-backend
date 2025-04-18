const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');

router.get('/usuario', UsuarioController.listar);

module.exports = router;
