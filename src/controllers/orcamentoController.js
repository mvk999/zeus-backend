const DAOorcamento = require('../dao/DAOorcamento');

class OrcamentoController {
  static listar(req, res) {
    DAOorcamento.listarTodos((err, orcamentos) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao listar orçamentos' });
      }
      res.status(200).json(orcamentos);
    });
  }

  static buscarPorId(req, res) {
    const id = req.params.id;
    DAOorcamento.buscarPorId(id, (err, orcamento) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao buscar orçamento' });
      }
      if (!orcamento) {
        return res.status(404).json({ erro: 'Orçamento não encontrado' });
      }
      res.status(200).json(orcamento);
    });
  }

  static inserir(req, res) {
    const orcamento = req.body;
    DAOorcamento.inserir(orcamento, (err, resultado) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao inserir orçamento' });
      }
      res.status(201).json({ mensagem: 'Orçamento inserido com sucesso', resultado });
    });
  }

  static atualizar(req, res) {
    const id = req.params.id;
    const orcamento = { ...req.body, id_orcamento: id };

    DAOorcamento.atualizar(orcamento, (err, resultado) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao atualizar orçamento' });
      }
      res.status(200).json({ mensagem: 'Orçamento atualizado com sucesso', resultado });
    });
  }

  static deletar(req, res) {
    const id = req.params.id;
    DAOorcamento.deletar(id, (err, resultado) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao deletar orçamento' });
      }
      if (!resultado || resultado.affectedRows === 0) {
        return res.status(404).json({ erro: 'Orçamento não encontrado' });
      }
      res.status(200).json({ mensagem: 'Orçamento excluído com sucesso' });
    });
  }
}

module.exports = OrcamentoController;
