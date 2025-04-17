class cliente{
    constructor(id_cli,nome_cli,email_cli,telefone_cli,empresa_cli){
        this.id_cli = id_cli;
        this.nome_cli = nome_cli;
        this.email_cli = email_cli;
        this.telefone_cli = telefone_cli;
        this.empresa_cli = empresa_cli;
    }

}
module.exports = cliente; //exportando a classe cliente para ser usada em outros arquivos