const DAOusuario = require('../dao/DAOusuario');

class UsuarioController {
  static listar(req, res) {
    DAOusuario.listarTodos((err, usuarios) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao listar usuários' });
      }
      res.json(usuarios);
    });
  }
}

module.exports = UsuarioController;
