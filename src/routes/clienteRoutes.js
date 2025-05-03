const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/clienteController');

router.get('/cliente', ClienteController.listar);
router.get('/cliente/:id', ClienteController.buscarPorId);
router.post('/cliente', ClienteController.inserir);
router.put('/cliente/:id', ClienteController.atualizar);
router.delete('/cliente/:id', ClienteController.deletar);

module.exports = router;
