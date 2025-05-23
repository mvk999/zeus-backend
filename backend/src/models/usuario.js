class usuario {
    //criei o construtor para quando der new usuario() ele já criar com todos os atributos obrigatorios
    constructor(id_user,nome_user,email_user,senha_user,tipo_user) {
        this.id_user = id_user;
        this.nome_user = nome_user;
        this.email_user = email_user;
        this.senha_user = senha_user;
        this.tipo_user = tipo_user;
    }

}
 module.exports = usuario; //exportando a classe usuario para ser usada em outros arquivos