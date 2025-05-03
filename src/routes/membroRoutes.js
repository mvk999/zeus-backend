const express = require('express');
const router = express.Router();
const MembroController = require('../controllers/membroController');

// ROTAS
router.get('/membro', MembroController.listar);
router.get('/membro/:id', MembroController.buscarPorId);
router.post('/membro', MembroController.inserir);
router.put('/membro/:id', MembroController.atualizar);
router.delete('/membro/:id', MembroController.deletar);

module.exports = router;
