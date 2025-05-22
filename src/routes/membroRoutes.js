const express = require('express');
const router = express.Router();
const MembroController = require('../controllers/membroController');

// middlewares de autenticação tipo de usuário
const autenticarToken = require('../middlewares/auth');      
const authAdmin = require('../middlewares/authAdmin'); // só deixa passar se tipo_user === 'admin'

// só admin pode listar todos os membros
router.get('/membro', autenticarToken, authAdmin, MembroController.listar);

// só admin pode buscar membro por ID
router.get('/membro/:id', autenticarToken, authAdmin, MembroController.buscarPorId);

// só admin pode cadastrar novo membro
router.post('/membro', autenticarToken, authAdmin, MembroController.inserir);

// só admin pode atualizar dados de um membro
router.put('/membro/:id', autenticarToken, authAdmin, MembroController.atualizar);

// só admin pode deletar um membro
router.delete('/membro/:id', autenticarToken, authAdmin, MembroController.deletar);

module.exports = router;
