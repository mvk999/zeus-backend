const DAOusuario = require('../dao/DAOusuario');
const db = require('../config/dbconnect');
const transporter = require('../config/mailer');
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
          console.error("Erro no DAOusuario:", err); // Mostra no terminal
          return res.status(500).json({ erro: 'Erro ao inserir usuário', detalhe: err.message });
        }
        res.status(201).json({ mensagem: 'Usuário inserido com sucesso', resultado });
      });
    });
  }

  static login(req, res) {
    const jwt = require('jsonwebtoken');
    const email_user = req.body.email_user;
    const senhaDigitada = req.body.senha_user;
  
    if (!email_user || !senhaDigitada) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
    }
  
    DAOusuario.buscarPorEmail(email_user, (err, usuario) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro interno ao buscar usuário.' });
      }
  
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
      }
  
      // Verifica a senha
      const bcrypt = require('bcryptjs');
      bcrypt.compare(senhaDigitada, usuario.senha_user, (err, match) => {
        if (err) {
          return res.status(500).json({ erro: 'Erro ao comparar senhas.' });
        }
  
        if (!match) {
          return res.status(401).json({ erro: 'Senha incorreta.' });
        }
  
        // Geração do token após validação bem-sucedida
        const token = jwt.sign(
          { id: usuario.id_user, tipo: usuario.tipo_user },
          process.env.JWT_SECRET || 'segredoSuperSeguro',
          { expiresIn: '10h' }
        );
  
        res.status(200).json({
          mensagem: 'Login realizado com sucesso!',
          token: token,
          usuario: {
            id_user: usuario.id_user,
            nome_user: usuario.nome_user,
            email_user: usuario.email_user,
            tipo_user: usuario.tipo_user
          }
        });
      });
    });
  }
static esquecisenha(req, res) {
  const email = req.body.email_user;

  if (!email) {
    return res.status(400).json({ erro: 'Email é obrigatório.' });
  }

  DAOusuario.buscarPorEmail(email, (err, usuario) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar usuário.' });

    if (!usuario) {
      return res.status(404).json({ erro: 'Email não cadastrado.' });
    }

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    const dataLocal = new Date(Date.now() + 15 * 60 * 1000);
    dataLocal.setHours(dataLocal.getHours() - 3); // ajuste para ficar igual horario de brasilia
    const expiraEm = dataLocal.toISOString().slice(0, 19).replace('T', ' ');

    DAOusuario.salvarCodigoRecuperacao(email, codigo, expiraEm, (err, result) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao gerar código de recuperação.', detalhe: err.message });
      }

    // agora realmente envia o cod para um email valido (o email precisa existir para a conexao com o google)
    transporter.sendMail({
     from: '"Suporte Rhaegal" <no-reply@rhaegal.suporte.com>', // pode ser qualquer nome e-mail fake
     to: email,
     subject: 'Recuperação de Senha - Projeto Rhaegal',
       text: `Seu código de recuperação é: ${codigo}. Ele expira em 15 minutos.` //tem no BD tmb o tempo que ele expira,para fazer o calc
}, (err, info) => {
  if (err) {
    console.error('Erro ao enviar email:', err);
    return res.status(500).json({ erro: 'Erro ao enviar o código por email.' });
  }

  console.log('✉️  Email enviado com sucesso:', info.response);
  return res.status(200).json({ mensagem: 'Código de recuperação enviado para o email.' });
});
    });
  });
}

static redefinirSenha(req, res) {
  const { email_user, codigo, nova_senha } = req.body;

  if (!email_user || !codigo || !nova_senha) {
    return res.status(400).json({ erro: 'Email, código e nova senha são obrigatórios.' });
  }

  DAOusuario.verificarCodigoRecuperacao(email_user, codigo, (err, resultado) => {
    if (err) return res.status(500).json({ erro: 'Erro ao verificar código.', detalhe: err.message });

    if (!resultado || resultado.length === 0) {
      return res.status(400).json({ erro: 'Código inválido ou já utilizado.' });
    }

    const registro = resultado[0];
    const agora = new Date();
    const expira = new Date(registro.expira_em);

    if (agora > expira) {
      return res.status(400).json({ erro: 'Código expirado. Solicite um novo.' });
    }

    // Criptografar nova senha
    bcrypt.hash(nova_senha, 10, (err, hash) => {
      if (err) return res.status(500).json({ erro: 'Erro ao criptografar nova senha.' });

      const novoUsuario = {
        id_user: registro.id_user, // ou buscar pelo email
        email_user,
        senha_user: hash
      };

      // Atualiza a senha
      const sql = 'UPDATE usuario SET senha_user = ? WHERE email_user = ?';
      db.query(sql, [hash, email_user], (err, result) => {
        if (err) return res.status(500).json({ erro: 'Erro ao atualizar a senha.' });

        // Marca o código como usado
        DAOusuario.marcarCodigoComoUsado(email_user, codigo, () => {
          return res.status(200).json({ mensagem: 'Senha redefinida com sucesso!' });
        });
      });
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
