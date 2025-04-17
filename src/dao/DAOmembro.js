const db = require('../config/dbconnect.js');
const membro = require('../models/membro.js');
class DAOusuario{
    static inserir (membro, callback) {
        const sql = `
            INSERT INTO membro (id_membro,nome_membro,data_nascimento_membro,email_inst_membro,cargo_membro,telefone_membro,genero_membro,data_ingress_membro,id_user)
            VALUES (?, ?, ?, ?)
        `;
        const values = [
            membro.nome_membro,
            membro.email_membro,
            membro.senha_membro,
            membro.tipo_membro
        ];
        db.query(sql, values, callback);
    }

}