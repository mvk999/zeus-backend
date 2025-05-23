class Orcamento {
    constructor(
      id_orcamento,
      num_orcamento,
      desc_orcamento,
      valor_orcamento,
      custo_orcamento,
      data_criacao,
      status,
      id_membro,
      id_cli
    ) {
      this.id_orcamento = id_orcamento;
      this.num_orcamento = num_orcamento;
      this.desc_orcamento = desc_orcamento;
      this.valor_orcamento = valor_orcamento;
      this.custo_orcamento = custo_orcamento;
      this.data_criacao = data_criacao;
      this.status = status;
      this.id_membro = id_membro;
      this.id_cli = id_cli;
    }
  }
  
  module.exports = Orcamento;
  