const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');

router.get('/usuario', UsuarioController.listar);          // Listar todos
router.get('/usuario/:id', UsuarioController.buscarPorId); // Buscar um por ID
router.post('/usuario', UsuarioController.inserir);        // Criar novo
router.put('/usuario/:id', UsuarioController.atualizar);   // Atualizar
router.delete('/usuario/:id', UsuarioController.deletar);  // Deletar

module.exports = router;
