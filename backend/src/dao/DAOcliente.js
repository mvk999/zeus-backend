const db = require('../config/dbconnect.js');
const Cliente = require('../models/cliente.js');

class DAOcliente {
  static inserir(cliente, callback) {
    const sql = `
      INSERT INTO cliente (nome_cli, email_cli, telefone_cli, empresa_cli)
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      cliente.nome_cli,
      cliente.email_cli,
      cliente.telefone_cli,
      cliente.empresa_cli
    ];
    db.query(sql, values, callback);
  }

  static listarTodos(callback) {
    const sql = 'SELECT * FROM cliente';
    db.query(sql, (err, results) => {
      if (err) return callback(err, null);
      const clientes = results.map(c =>
        new Cliente(c.id_cli, c.nome_cli, c.email_cli, c.telefone_cli, c.empresa_cli)
      );
      callback(null, clientes);
    });
  }

  static buscarPorId(id, callback) {
    const sql = 'SELECT * FROM cliente WHERE id_cli = ?';
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null);

      const c = results[0];
      const cliente = new Cliente(c.id_cli, c.nome_cli, c.email_cli, c.telefone_cli, c.empresa_cli);
      callback(null, cliente);
    });
  }

  static atualizar(cliente, callback) {
    const sql = `
      UPDATE cliente SET
        nome_cli = ?,
        email_cli = ?,
        telefone_cli = ?,
        empresa_cli = ?
      WHERE id_cli = ?
    `;
    const values = [
      cliente.nome_cli,
      cliente.email_cli,
      cliente.telefone_cli,
      cliente.empresa_cli,
      cliente.id_cli
    ];
    db.query(sql, values, callback);
  }

  static deletar(id, callback) {
    const sql = 'DELETE FROM cliente WHERE id_cli = ?';
    db.query(sql, [id], callback);
  }
}

module.exports = DAOcliente;
