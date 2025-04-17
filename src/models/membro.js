class membro{
    constructor(id_membro,nome_membro,data_nascimento_membro,email_inst_membro,cargo_membro,telefone_membro,genero_membro,data_ingress_membro,id_user)
{
    this.id_membro = id_membro;
    this.nome_membro = nome_membro;
    this.data_nascimento_membro = data_nascimento_membro;
    this.email_inst_membro = email_inst_membro;
    this.cargo_membro = cargo_membro;
    this.telefone_membro = telefone_membro;
    this.genero_membro = genero_membro;
    this.data_ingress_membro = data_ingress_membro;
    this.id_user = id_user;
}
}

module.exports = membro; //exportando a classe membro para ser usada em outros arquivos