const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');
const autenticarToken = require('../middlewares/auth'); // 👈 importado aqui

// 🔓 Rota pública
router.post('/usuario/login', UsuarioController.login);

// 🔐 Rotas protegidas
router.get('/usuario', autenticarToken, UsuarioController.listar);
router.get('/usuario/:id', autenticarToken, UsuarioController.buscarPorId);
router.post('/usuario', autenticarToken, UsuarioController.inserir);
router.put('/usuario/:id', autenticarToken, UsuarioController.atualizar);
router.delete('/usuario/:id', autenticarToken, UsuarioController.deletar);

module.exports = router;
