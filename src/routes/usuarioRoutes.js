const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');

// rotas aq sao as publicas
router.post('/usuario/redefinir-senha', UsuarioController.redefinirSenha);
router.post('/usuario/esqueci-senha', UsuarioController.esquecisenha);


// middlewares de autenticação tipo de usuário
const autenticarToken = require('../middlewares/auth');      
const authAdmin = require('../middlewares/authAdmin');//só deixa logar se tipo_user === 'admin'

//login não exige autenticação
router.post('/usuario/login', UsuarioController.login);

//cadastro de novo usuário também não exige autenticação
router.post('/usuario', UsuarioController.inserir);

//somente admin pode ver todos os usuários
router.get('/usuario', autenticarToken, authAdmin, UsuarioController.listar);

// somente admin pode buscar qualquer usuário por ID
router.get('/usuario/:id', autenticarToken, authAdmin, UsuarioController.buscarPorId);

//somente admin pode alterar usuários
router.put('/usuario/:id', autenticarToken, authAdmin, UsuarioController.atualizar);

// somente admin pode deletar usuários
router.delete('/usuario/:id', autenticarToken, authAdmin, UsuarioController.deletar);

module.exports = router;
