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
  
    // 🔒 Validação extra para cliente
    if (usuario.tipo_user?.toLowerCase() === 'cliente') {
      if (!usuario.telefone_user || !usuario.empresa_user) {
        return res.status(400).json({
          erro: 'Telefone e empresa são obrigatórios para clientes.'
        });
      }
    }
  
    // Criptografar a senha
    bcrypt.hash(usuario.senha_user, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao criptografar a senha' });
      }
  
      usuario.senha_user = hash;
  
      DAOusuario.inserir(usuario, (err, resultado) => {
        if (err) {
          console.error("Erro no DAOusuario:", err);
          return res.status(500).json({ erro: 'Erro ao inserir usuário', detalhe: err.message });
        }
  
        const id_user_inserido = resultado.insertId;
  
        // Se for cliente, cria também na tabela cliente
        if (usuario.tipo_user?.toLowerCase() === 'cliente') {
          // valida os campos obrigatorios para os clientes
          //a primeira vez q faz login cria todo o cadastro do cliente,depois é apenas email_user e senha
          const sqlCliente = `
            INSERT INTO cliente (id_user, nome_cli, email_cli, telefone_cli, empresa_cli)
            VALUES (?, ?, ?, ?, ?)
          `;
  
          db.query(
            sqlCliente,
            [
              id_user_inserido,
              usuario.nome_user,
              usuario.email_user,
              usuario.telefone_user,
              usuario.empresa_user
            ],
            (errCliente) => {
              if (errCliente) {
                console.error("Erro ao criar cliente vinculado:", errCliente);
                return res.status(500).json({
                  erro: 'Usuário criado, mas erro ao vincular cliente.',
                  detalhe: errCliente.sqlMessage
                });
              }
  
              return res.status(201).json({
                mensagem: 'Usuário e cliente criados com sucesso!',
                id_user: id_user_inserido
              });
            }
          );
  
        } else if (usuario.tipo_user?.toLowerCase() === 'admin') {
          // valida os campos obrigatorios para os admin
          //a primeira vez q faz login cria todo o cadastro do admin,depois é apenas email_user e senha
          const camposObrigatorios = [
            'nome_membro',
            'data_nascimento_membro',
            'email_inst_membro',
            'cargo_membro',
            'telefone_membro',
            'genero_membro',
            'foto_membro',
            'data_ingress_membro'
          ];
  
          const camposFaltando = camposObrigatorios.filter(campo => !usuario[campo]);
          if (camposFaltando.length > 0) {
            return res.status(400).json({
              erro: `Campos obrigatórios ausentes para membro: ${camposFaltando.join(', ')}`
            });
          }
  
          // Validação de extensão da foto
          const extensoesAceitas = ['.jpg', '.jpeg', '.png'];
          const foto = usuario.foto_membro.toLowerCase();
          const extensaoValida = extensoesAceitas.some(ext => foto.endsWith(ext));
  
          if (!extensaoValida) {
            return res.status(400).json({ erro: 'A foto deve ser JPG, JPEG ou PNG.' });
          }
  
          const sqlMembro = `
            INSERT INTO membro (
              nome_membro, data_nascimento_membro, email_inst_membro, cargo_membro,
              telefone_membro, genero_membro, foto_membro, data_ingress_membro, id_user
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;
  
          db.query(sqlMembro, [
            usuario.nome_membro,
            usuario.data_nascimento_membro,
            usuario.email_inst_membro,
            usuario.cargo_membro,
            usuario.telefone_membro,
            usuario.genero_membro,
            usuario.foto_membro,
            usuario.data_ingress_membro,
            id_user_inserido
          ], (errMembro) => {
            if (errMembro) {
              console.error("Erro ao criar membro vinculado:", errMembro);
              return res.status(500).json({
                erro: 'Usuário criado, mas erro ao vincular membro.',
                detalhe: errMembro.sqlMessage
              });
            }
  
            return res.status(201).json({
              mensagem: 'Usuário e membro criados com sucesso!',
              id_user: id_user_inserido
            });
          });
  
        } else {
          // Tipo diferente de cliente ou admin
          res.status(201).json({
            mensagem: 'Usuário criado com sucesso!',
            id_user: id_user_inserido
          });
        }
      });
    });
  }

  static login(req, res) {
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcryptjs');
  
    const email_user = req.body.email_user;
    const senhaDigitada = req.body.senha_user;
  
    if (!email_user || !senhaDigitada) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
    }
  
    DAOusuario.buscarPorEmail(email_user, async (err, usuario) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro interno ao buscar usuário.' });
      }
  
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
      }
  
      // Verifica se está bloqueado
      const agora = new Date();
      if (usuario.bloqueado_ate && new Date(usuario.bloqueado_ate) > agora) {
        return res.status(403).json({
          erro: 'Conta temporariamente bloqueada. Tente novamente mais tarde.'
        });
      }
  
      const senhaCorreta = await bcrypt.compare(senhaDigitada, usuario.senha_user);
  
      if (!senhaCorreta) {
        const novasTentativas = (usuario.tentativas_login || 0) + 1;
  
        if (novasTentativas >= 3) {
          const dataBloqueio = new Date();
          dataBloqueio.setMinutes(dataBloqueio.getMinutes() + 15); // bloqueia por 15 min o usuario de tentar logar novamente
  
          DAOusuario.atualizarTentativasEBloqueio(email_user, novasTentativas, dataBloqueio);
          return res.status(403).json({
            erro: 'Conta bloqueada após 3 tentativas. Tente novamente em 15 minutos.'
          });
        } else {
          DAOusuario.atualizarTentativasEBloqueio(email_user, novasTentativas, null);
          return res.status(401).json({ erro: 'Senha incorreta.' });
        }
      }
  
      // Login bem-sucedido: zera tentativas
      DAOusuario.atualizarTentativasEBloqueio(email_user, 0, null);
  
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
  }
  
  static atualizarTentativasEBloqueio(email, tentativas, bloqueadoAte) {
    console.log('>> Atualizando tentativas:', { email, tentativas, bloqueadoAte }); 
  
    const sql = 'UPDATE usuario SET tentativas_login = ?, bloqueado_ate = ? WHERE email_user = ?';
    db.query(sql, [tentativas, bloqueadoAte, email], (err) => {
      if (err) {
        console.error('Erro ao atualizar tentativas de login:', err);
      }
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
