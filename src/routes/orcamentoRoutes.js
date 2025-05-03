const express = require('express');
const router = express.Router();
const OrcamentoController = require('../controllers/orcamentoController');

router.get('/orcamento', OrcamentoController.listar);
router.get('/orcamento/:id', OrcamentoController.buscarPorId);
router.post('/orcamento', OrcamentoController.inserir);
router.put('/orcamento/:id', OrcamentoController.atualizar);
router.delete('/orcamento/:id', OrcamentoController.deletar);

module.exports = router;
