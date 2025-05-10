const express = require('express');
const router = express.Router();
const OrcamentoController = require('../controllers/orcamentoController');

// middlewares de autenticação
const autenticarToken = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');
const authCliente = require('../middlewares/authCliente');

//  Rotas protegidas para ADMIN
router.get('/orcamento', autenticarToken, authAdmin, OrcamentoController.listar);
router.get('/orcamento/:id', autenticarToken, authAdmin, OrcamentoController.buscarPorId);
router.post('/orcamento', autenticarToken, authAdmin, OrcamentoController.inserir);
router.put('/orcamento/:id', autenticarToken, authAdmin, OrcamentoController.atualizar);
router.delete('/orcamento/:id', autenticarToken, authAdmin, OrcamentoController.deletar);

//  Rota para CLIENTE ver seus próprios orçamentos
router.get('/orcamento/cliente', autenticarToken, authCliente, OrcamentoController.listarDoCliente);

module.exports = router;