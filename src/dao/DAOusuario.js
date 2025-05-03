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
}

module.exports = DAOusuario;
