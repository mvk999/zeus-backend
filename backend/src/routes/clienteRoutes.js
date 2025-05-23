const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/clienteController');

// middlewares de autenticação tipo de usuário
const autenticarToken = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin'); // só deixa passar se tipo_user === 'admin'
const authCliente = require('../middlewares/authCliente'); // só deixa passar se tipo_user === 'cliente'

// só admin pode ver todos os clientes
router.get('/cliente', autenticarToken, authAdmin, ClienteController.listar);

// só admin pode buscar qualquer cliente por ID
router.get('/cliente/:id', autenticarToken, authAdmin, ClienteController.buscarPorId);

// cadastro de cliente publico (cliente pode se autocadastrar??)
router.post('/cliente', ClienteController.inserir);
// só admin pode cadastrar cliente,caso seja somente admin ja ta feito na linha abaixo
//router.post('/cliente', autenticarToken, authAdmin, ClienteController.inserir);


// cliente ou admin podem atualizar — mas aqui deixei só cliente
router.put('/cliente/:id', autenticarToken, authCliente, ClienteController.atualizar);

// só admin pode deletar cliente
router.delete('/cliente/:id', autenticarToken, authAdmin, ClienteController.deletar);

module.exports = router;
