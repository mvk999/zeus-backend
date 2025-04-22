const DAOmembro = require('../dao/DAOmembro');

class MembroController {
  static listar(req, res) {
    DAOmembro.listarTodos((err, membros) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao listar membros' });
      }
      res.json(membros);
    });
  }

  static buscarPorId(req, res) {
    const id = req.params.id;
    DAOmembro.buscarPorId(id, (err, membro) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao buscar membro' });
      }
      if (!membro) {
        return res.status(404).json({ erro: 'Membro não encontrado' });
      }
      res.json(membro);
    });
  }

  static inserir(req, res) {
    const membro = req.body;
    DAOmembro.inserir(membro, (err, resultado) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao inserir membro' });
      }
      res.status(201).json({ mensagem: 'Membro inserido com sucesso', resultado });
    });
  }

  static atualizar(req, res) {
    const id = req.params.id;
    const membro = req.body;
    membro.id_membro = id; // importante para passar o ID certo pro DAO
    DAOmembro.atualizar(membro, (err, resultado) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao atualizar membro' });
      }
      res.json({ mensagem: 'Membro atualizado com sucesso', resultado });
    });
  }

  //arrumar isso aq 
  static deletar(req, res) {
    const id = req.params.id;
    DAOmembro.deletar(id, (err, resultado) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao deletar membro' });
      }
      if (!resultado || resultado.affectedRows === 0) {
        return res.status(404).json({ erro: 'Membro não encontrado' });
      }
      res.status(200).json({mensagem:'Membro excluido com sucesso'}); // Sucesso sem conteúdo
    });
  }
}

module.exports = MembroController;
