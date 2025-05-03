const DAOusuario = require('../dao/DAOusuario');
const bcrypt = require('bcryptjs');

class UsuarioController {
  // LISTAR todos os usuários
  static listar(req, res) {
    DAOusuario.listarTodos((err, usuarios) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao listar usuários' });
      }
      res.json(usuarios);
    });
  }

  // BUSCAR um usuário por ID
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

  // INSERIR um novo usuário
  static inserir(req, res) {
    const usuario = req.body;
    console.log("Dados recebidos no body:", usuario);

    // Validação básica
    if (!usuario.email_user || !usuario.senha_user) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
    }

    // Validação de e-mail
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.email_user);
    if (!emailValido) {
      return res.status(400).json({ erro: 'Email inválido' });
    }

    // Validação de senha
    if (usuario.senha_user.length < 6) {
      return res.status(400).json({ erro: 'A senha deve ter no mínimo 6 caracteres' });
    }

    // Criptografar a senha
    bcrypt.hash(usuario.senha_user, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao criptografar a senha' });
      }

      usuario.senha_user = hash;

      DAOusuario.inserir(usuario, (err, resultado) => {
        if (err) {
          return res.status(500).json({ erro: 'Erro ao inserir usuário' });
        }
        res.status(201).json({ mensagem: 'Usuário inserido com sucesso', resultado });
      });
    });
  }

  // ATUALIZAR usuário
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

  // DELETAR usuário
  static deletar(req, res) {
    const id = req.params.id;

    if (!req.body.confirmado) {
      return res.status(400).json({
        erro: 'Exclusão não confirmada. Envie { "confirmado": true } no corpo da requisição.'
      });
    }

    DAOusuario.deletar(id, (err, resultado) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao deletar usuário' });
      }
      if (!resultado || resultado.affectedRows === 0) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }
      res.status(200).json({ mensagem: 'Usuário excluído com sucesso' });
    });
  }
}

module.exports = UsuarioController;
