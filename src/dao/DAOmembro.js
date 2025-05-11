const db = require('../config/dbconnect.js');
const Membro = require('../models/membro.js');  

class DAOmembro {
  // INSERIR um novo membro
  static inserir(membro, callback) {
    const sql = `
      INSERT INTO membro (
        nome_membro,
        email_inst_membro,
        data_nascimento_membro,
        cargo_membro,
        telefone_membro,
        genero_membro,
        foto_membro,
        data_ingress_membro,
        id_user
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      membro.nome_membro,
      membro.email_inst_membro,
      membro.data_nascimento_membro,
      membro.cargo_membro,
      membro.telefone_membro,
      membro.genero_membro,
      membro.foto_membro,
      membro.data_ingress_membro,
      membro.id_user
    ];
    db.query(sql, values, callback);
  }

  // CONSULTAR todos os membros
  static listarTodos(callback) {
    const sql = 'SELECT * FROM membro';
    db.query(sql, (err, results) => {
      if (err) return callback(err, null);
      const membros = results.map(u =>
        new Membro(
          u.id_membro,
          u.nome_membro,
          u.data_nascimento_membro,
          u.email_inst_membro,
          u.cargo_membro,
          u.telefone_membro,
          u.genero_membro,
          u.foto_membro,              
          u.data_ingress_membro,
          u.id_user
        )
      );
      callback(null, membros);
    });
  }

  // CONSULTAR por ID
  static buscarPorId(id, callback) {
    const sql = 'SELECT * FROM membro WHERE id_membro = ?';
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null);

      const u = results[0];
      const membro = new Membro(
        u.id_membro,
        u.nome_membro,
        u.data_nascimento_membro,
        u.email_inst_membro,
        u.cargo_membro,
        u.telefone_membro,
        u.genero_membro,
        u.foto_membro,              
        u.data_ingress_membro,
        u.id_user
      );
      callback(null, membro);
    });
  }

  // ATUALIZAR um membro
  static atualizar(membro, callback) {
    const sql = `
      UPDATE membro SET
        nome_membro = ?,
        data_nascimento_membro = ?,
        email_inst_membro = ?,
        cargo_membro = ?,
        telefone_membro = ?,
        genero_membro = ?,
        foto_membro = ?,              -- ADICIONADO AQUI
        data_ingress_membro = ?,
        id_user = ?
      WHERE id_membro = ?
    `;
    const values = [
      membro.nome_membro,
      membro.data_nascimento_membro,
      membro.email_inst_membro,
      membro.cargo_membro,
      membro.telefone_membro,
      membro.genero_membro,
      membro.foto_membro,             
      membro.data_ingress_membro,
      membro.id_user,
      membro.id_membro
    ];
    db.query(sql, values, callback);
  }

  // EXCLUIR um membro
  static deletar(id, callback) {
    const sql = 'DELETE FROM membro WHERE id_membro = ?';
    db.query(sql, [id], callback);
  }
}

module.exports = DAOmembro;
