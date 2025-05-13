const db = require('../config/dbconnect.js');
const Orcamento = require('../models/orcamento.js');

class DAOorcamento {
  static inserir(orcamento, callback) {
    const sql = `
      INSERT INTO orcamento (num_orcamento, desc_orcamento, valor_orcamento, custo_orcamento, data_criacao, status, id_membro, id_cli)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      orcamento.num_orcamento,
      orcamento.desc_orcamento,
      orcamento.valor_orcamento,
      orcamento.custo_orcamento,
      orcamento.data_criacao,
      orcamento.status,
      orcamento.id_membro,
      orcamento.id_cli
    ];
    db.query(sql, values, callback);
  }

  static listarTodos(callback) {
    const sql = 'SELECT * FROM orcamento';
    db.query(sql, (err, results) => {
      if (err) return callback(err, null);
      const orcamentos = results.map(o =>
        new Orcamento(o.id_orcamento, o.num_orcamento, o.desc_orcamento, o.valor_orcamento, o.custo_orcamento, o.data_criacao, o.status, o.id_membro, o.id_cli)
      );
      callback(null, orcamentos);
    });
  }

  static buscarComFiltros(status, id_cli, callback) {
    let sql = 'SELECT * FROM orcamento WHERE 1=1';
    const values = [];
  
    if (status) {
      sql += ' AND status = ?';
      values.push(status);
    }
  
    if (id_cli) {
      sql += ' AND id_cli = ?';
      values.push(id_cli);
    }
  
    db.query(sql, values, (err, results) => {
      if (err) return callback(err, null);
  
      const orcamentos = results.map(o =>
        new Orcamento(
          o.id_orcamento,
          o.num_orcamento,
          o.desc_orcamento,
          o.valor_orcamento,
          o.custo_orcamento,
          o.data_criacao,
          o.status,
          o.id_membro,
          o.id_cli
        )
      );
  
      callback(null, orcamentos);
    });
  }
  
  static buscarPorId(id, callback) {
    const sql = 'SELECT * FROM orcamento WHERE id_orcamento = ?';
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null);
      const o = results[0];
      const orcamento = new Orcamento(o.id_orcamento, o.num_orcamento, o.desc_orcamento, o.valor_orcamento, o.custo_orcamento, o.data_criacao, o.status, o.id_membro, o.id_cli);
      callback(null, orcamento);
    });
  }

  static atualizar(orcamento, callback) {
    const sql = `
      UPDATE orcamento SET
        num_orcamento = ?,
        desc_orcamento = ?,
        valor_orcamento = ?,
        custo_orcamento = ?,
        data_criacao = ?,
        status = ?,
        id_membro = ?,
        id_cli = ?
      WHERE id_orcamento = ?
    `;
    const values = [
      orcamento.num_orcamento,
      orcamento.desc_orcamento,
      orcamento.valor_orcamento,
      orcamento.custo_orcamento,
      orcamento.data_criacao,
      orcamento.status,
      orcamento.id_membro,
      orcamento.id_cli,
      orcamento.id_orcamento
    ];
    db.query(sql, values, callback);
  }

static listarPorCliente(id_cli, callback) {
  const sql = 'SELECT * FROM orcamento WHERE id_cli = ?';
  db.query(sql, [id_cli], callback);
}

  static deletar(id, callback) {
    const sql = 'DELETE FROM orcamento WHERE id_orcamento = ?';
    db.query(sql, [id], callback);
  }
}

module.exports = DAOorcamento;
