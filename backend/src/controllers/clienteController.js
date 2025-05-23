const DAOcliente = require('../dao/DAOcliente');

class ClienteController {
  static listar(req, res) {
    DAOcliente.listarTodos((err, clientes) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao listar clientes' });
      }
      res.json(clientes);
    });
  }

  static buscarPorId(req, res) {
    const id = req.params.id;
    DAOcliente.buscarPorId(id, (err, cliente) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao buscar cliente' });
      }
      if (!cliente) {
        return res.status(404).json({ erro: 'Cliente não encontrado' });
      }
      res.json(cliente);
    });
  }

  static inserir(req, res) {
    const cliente = req.body;
    DAOcliente.inserir(cliente, (err, resultado) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao inserir cliente' });
      }
      res.status(201).json({ mensagem: 'Cliente inserido com sucesso', resultado });
    });
  }

  static atualizar(req, res) {
    const cliente = { ...req.body, id_cli: req.params.id }; 
    DAOcliente.atualizar(cliente, (err, resultado) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao atualizar cliente' });
      }
      if (!resultado || resultado.affectedRows === 0) {
        return res.status(404).json({ erro: 'Cliente não encontrado' });
      }
      res.status(200).json({ mensagem: 'Cliente atualizado com sucesso' });
    });
  }

  static deletar(req, res) {
    const id = req.params.id;
    DAOcliente.deletar(id, (err, resultado) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao deletar cliente', err: err });
      }
      if (!resultado || resultado.affectedRows === 0) {
        return res.status(404).json({ erro: 'Cliente não encontrado' });
      }
      res.status(200).json({ mensagem: 'Cliente excluído com sucesso' });
    });
  }
}

module.exports = ClienteController;
