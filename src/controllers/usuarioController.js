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

  static buscarPorId(req, res) {
    const id = req.params.id;
    DAOusuario.buscarPorId(id, (err, usuario) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao buscar usuário' });
      }
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }
      res.json(usuario);
    });
  }

  static inserir(req, res) {
    const usuario = req.body;
    DAOusuario.inserir(usuario, (err, resultado) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao inserir usuário' });
      }
      res.status(201).json({ mensagem: 'Usuário criado com sucesso', id: resultado.insertId });
    });
  }

  static atualizar(req, res) {
    const id = req.params.id;
    const usuario = { ...req.body, id_user: id };

    DAOusuario.atualizar(usuario, (err, resultado) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao atualizar usuário' });
      }
      res.json({ mensagem: 'Usuário atualizado com sucesso' });
    });
  }

static deletar(req, res) {
  const id = req.params.id;

  // Se o corpo da requisição não confirmar
  if (!req.body.confirmado) {
    return res.status(400).json({
      erro: 'Exclusão não confirmada. Envie { "confirmado": true } no body.'
    });
  }

  DAOorcamento.deletar(id, (err, resultado) => {
    if (err) return res.status(500).json({ erro: 'Erro ao deletar orçamento' });
    res.status(204).send();
  });
  
}
}
  module.exports = UsuarioController;
