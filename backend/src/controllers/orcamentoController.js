const DAOorcamento = require('../dao/DAOorcamento');

class OrcamentoController {
  static listar(req, res) {
    const { status, id_cli } = req.query;
  
    if (status || id_cli) {
      DAOorcamento.buscarComFiltros(status, id_cli, (err, orcamentos) => {
        if (err) {
          return res.status(500).json({ erro: 'Erro ao buscar orçamentos com filtros' });
        }
  
        if (!orcamentos.length) {
          return res.status(404).json({ mensagem: 'Nenhum orçamento encontrado com os filtros fornecidos.' });
        }
  
        res.status(200).json(orcamentos);
      });
    } else {
      DAOorcamento.listarTodos((err, orcamentos) => {
        if (err) {
          return res.status(500).json({ erro: 'Erro ao listar orçamentos' });
        }
        res.status(200).json(orcamentos);
      });
    }
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
  
    const {
      num_orcamento,
      desc_orcamento,
      id_cli,
      id_membro,
      valor_orcamento,
      custo_orcamento,
      status
    } = orcamento;
  
    if (!num_orcamento || !desc_orcamento || !id_cli || !id_membro || !valor_orcamento || !custo_orcamento) {
      return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }
  
    const statusValido = ['Em análise', 'Aprovado', 'Reprovado'];
    if (!statusValido.includes(status)) {
      return res.status(400).json({ erro: 'Status inválido. Use: Em análise, Aprovado ou Reprovado.' });
    }
  
    // gera a data atual
    orcamento.data_criacao = new Date();
  
    DAOorcamento.inserir(orcamento, (err, resultado) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao inserir orçamento', detalhe: err.message });
      }
      res.status(201).json({ mensagem: 'Orçamento criado com sucesso', resultado });
    });
  }
  

  static listarPorCliente(req, res) {
    const idCliente = req.user.id;  // Assumindo que o ID do cliente vem do token (JWT)
  
    console.log("ID do cliente:", idCliente); // Verifique se está pegando o ID corretamente
  
    DAOorcamento.listarPorCliente(idCliente, (err, orcamentos) => {
      if (err) {
        console.error("Erro ao buscar orçamentos:", err);  // Log para debugar
        return res.status(500).json({ erro: 'Erro ao listar orçamentos do cliente' });
      }
      if (orcamentos.length === 0) {
        return res.status(404).json({ erro: 'Nenhum orçamento encontrado para este cliente' });
      }
      console.log("Orçamentos encontrados:", orcamentos);  // Verifique os orçamentos encontrados
      res.status(200).json(orcamentos);  // Envia a lista de orçamentos
    });
  }

  static atualizar(req, res) {
    const id = req.params.id;
    const orcamento = { ...req.body, id_orcamento: id };
  
    const {
      num_orcamento,
      desc_orcamento,
      id_cli,
      id_membro,
      valor_orcamento,
      custo_orcamento,
      status
    } = orcamento;
  
    if (!num_orcamento || !desc_orcamento || !id_cli || !id_membro || !valor_orcamento || !custo_orcamento || !status) {
      return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }
  
    // Validar status permitido
    const statusValido = ['Em análise', 'Aprovado', 'Reprovado'];
    if (!statusValido.includes(status)) {
      return res.status(400).json({ erro: 'Status inválido. Use: Em análise, Aprovado ou Reprovado.' });
    }
  
    if (!orcamento.data_criacao) {
      orcamento.data_criacao = new Date(); 
    }
  
    DAOorcamento.atualizar(orcamento, (err, resultado) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao atualizar orçamento', detalhe: err.message });
      }
      res.status(200).json({ mensagem: 'Orçamento atualizado com sucesso', resultado });
    });
  }
  
  static atualizarStatus(req, res) {
    const id = req.params.id;
    const { status } = req.body;
  
    const statusValido = ['Em análise', 'Aprovado', 'Reprovado'];
  
    if (!statusValido.includes(status)) {
      return res.status(400).json({ erro: 'Status inválido. Use: Em análise, Aprovado ou Reprovado.' });
    }
  
    DAOorcamento.atualizarStatus(id, status, (err, resultado) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao atualizar status do orçamento' });
      }
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ erro: 'Orçamento não encontrado' });
      }
      res.status(200).json({ mensagem: 'Status atualizado com sucesso' });
    });
  }
  



static listarDoCliente(req, res) {
  const idCliente = req.user.id;

  DAOorcamento.listarPorCliente(idCliente, (err, orcamentos) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao listar orçamentos do cliente' });
    }
    res.status(200).json(orcamentos);
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
