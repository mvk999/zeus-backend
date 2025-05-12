const DAOmembro = require('../dao/DAOmembro');

class MembroController {
  static listar(req, res) {
    const nomeFiltro = req.query.nome;
  
    if (nomeFiltro) {
      DAOmembro.buscarPorNome(nomeFiltro, (err, membros) => {
        if (err) {
          return res.status(500).json({ erro: 'Erro ao buscar membros por nome' });
        }
  
        if (membros.length === 0) {
          return res.status(404).json({ mensagem: `Nenhum membro encontrado com o nome ${nomeFiltro}.` });
        }
  
        return res.status(200).json(membros);
      });
    } else {
      DAOmembro.listarTodos((err, membros) => {
        if (err) {
          return res.status(500).json({ erro: 'Erro ao listar membros' });
        }
  
        res.status(200).json(membros);
      });
    }
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

  const {
    nome_membro,
    cargo_membro,
    email_inst_membro,
    data_nascimento_membro,
    data_ingress_membro,
    foto
  } = membro;

  // Validações obrigatórias
  if (!nome_membro || !nome_membro.trim()) {
    return res.status(400).json({ erro: 'Nome do membro é obrigatório.' });
  }

  if (!cargo_membro || !cargo_membro.trim()) {
    return res.status(400).json({ erro: 'Cargo do membro é obrigatório.' });
  }

  if (!email_inst_membro || !email_inst_membro.endsWith('@compjunior.com')) {
    return res.status(400).json({ erro: 'O e-mail deve ser institucional (@compjunior.com.br).' });
  }

  const hoje = new Date();
  const nascimento = new Date(data_nascimento_membro);
  const ingresso = new Date(data_ingress_membro);

  if (nascimento >= hoje) {
    return res.status(400).json({ erro: 'A data de nascimento deve ser anterior à data atual.' });
  }

  if (ingresso >= hoje) {
    return res.status(400).json({ erro: 'A data de ingresso deve ser anterior à data atual.' });
  }

  // Validação de foto (simulada como string com nome ou URL)
  if (foto) {
    const extensao = foto.toLowerCase();
    const formatosAceitos = ['.jpg', '.jpeg', '.png'];
    const valido = formatosAceitos.some(ext => extensao.endsWith(ext));

    if (!valido) {
      return res.status(400).json({ erro: 'A foto deve ser JPG, JPEG ou PNG.' });
    }
    // Simulação de tamanho omitida por enquanto (base64 ou upload real seria necessário)
  }

  // Se todas as validações passaram, insere no banco
  DAOmembro.inserir(membro, (err, resultado) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao inserir membro', detalhe: err.message });
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
