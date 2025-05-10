const db = require('../config/dbconnect.js');
const Usuario = require('../models/usuario.js');

class DAOusuario {
  // INSERIR no banco (somente o DAO)
  static inserir(usuario, callback) {
    const sql = `
      INSERT INTO usuario (nome_user, email_user, senha_user, tipo_user)
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      usuario.nome_user,
      usuario.email_user,
      usuario.senha_user,
      usuario.tipo_user
    ];
    db.query(sql, values, callback);
  }

  static buscarPorId(id, callback) {
    const sql = 'SELECT * FROM usuario WHERE id_user = ?';
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null);
      const u = results[0];
      const usuario = new Usuario(u.id_user, u.nome_user, u.email_user, u.senha_user, u.tipo_user);
      callback(null, usuario);
    });
  }

  static atualizar(usuario, callback) {
    const sql = `
      UPDATE usuario SET
        nome_user = ?,
        email_user = ?,
        senha_user = ?,
        tipo_user = ?
      WHERE id_user = ?
    `;
    const values = [
      usuario.nome_user,
      usuario.email_user,
      usuario.senha_user,
      usuario.tipo_user,
      usuario.id_user
    ];
    db.query(sql, values, callback);
  }

  static deletar(id, callback) {
    const sql = 'DELETE FROM usuario WHERE id_user = ?';
    db.query(sql, [id], callback);
  }

static buscarPorEmail(email, callback) {
  const sql = 'SELECT * FROM usuario WHERE email_user = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return callback(err, null);
    if (results.length === 0) return callback(null, null);

    const u = results[0];
    const usuario = {
      id_user: u.id_user,
      nome_user: u.nome_user,
      email_user: u.email_user,
      senha_user: u.senha_user,
      tipo_user: u.tipo_user
    };

    callback(null, usuario);
  });
}

// Buscar usuário por email
  static buscarPorEmail(email, callback) {
  const sql = 'SELECT * FROM usuario WHERE email_user = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return callback(err, null);
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]);
  });
}

// Salvar código na tabela de recuperação
static salvarCodigoRecuperacao(email, codigo, expiraEm, callback) {
  const sql = `
    INSERT INTO recuperacao_senha (email_user, codigo_recuperacao, utilizado, expira_em)
    VALUES (?, ?, 0, ?)
  `;
  db.query(sql, [email, codigo, expiraEm], callback);
}
}
module.exports = DAOusuario;
