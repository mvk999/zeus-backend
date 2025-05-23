const express = require('express');
const router = express.Router();
const OrcamentoController = require('../controllers/orcamentoController');

// Middlewares de autenticação
const autenticarToken = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');
const authCliente = require('../middlewares/authCliente');

router.get('/orcamento/cliente', autenticarToken, authCliente, OrcamentoController.listarPorCliente);

// Rotas protegidas para ADMIN
router.patch('/orcamento/:id/status', autenticarToken, authAdmin, OrcamentoController.atualizarStatus);
router.get('/orcamento', autenticarToken, authAdmin, OrcamentoController.listar);
router.get('/orcamento/:id', autenticarToken, authAdmin, OrcamentoController.buscarPorId);
router.post('/orcamento', autenticarToken, authAdmin, OrcamentoController.inserir);
router.put('/orcamento/:id', autenticarToken, authAdmin, OrcamentoController.atualizar);
router.delete('/orcamento/:id', autenticarToken, authAdmin, OrcamentoController.deletar);

module.exports = router;
