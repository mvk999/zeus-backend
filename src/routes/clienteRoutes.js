const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/clienteController');
const autenticar = require('../middlewares/authMiddleware'); // 👈 Certo

router.get('/cliente', autenticar, ClienteController.listar); // 👈 Protegido
router.get('/cliente/:id', autenticar, ClienteController.buscarPorId);
router.post('/cliente', autenticar, ClienteController.inserir);
router.put('/cliente/:id', autenticar, ClienteController.atualizar);
router.delete('/cliente/:id', autenticar, ClienteController.deletar);

module.exports = router;
