const request = require('supertest');
const app = require('../../src/app');
 // caminho para o seu Express

describe('Cadastro de usuário', () => {
  it('deve retornar 201 ao criar um novo cliente', async () => {
    const resposta = await request(app)
      .post('/api/usuario')
      .send({
        nome_user: "Teste Jest",
        email_user: `jest_${Date.now()}@compjunior.com`,
        senha_user: "123456",
        tipo_user: "cliente",
        telefone_user: "(00) 00000-0000",
        empresa_user: "Testes Ltda"
      });

    expect(resposta.status).toBe(201);
    expect(resposta.body).toHaveProperty('id_user');
  });
  it('deve retornar 400 se cliente não enviar telefone ou empresa', async () => {
    const resposta = await request(app)
      .post('/api/usuario')
      .send({
        nome_user: "Cliente Incompleto",
        email_user: `sem_tel_${Date.now()}@compjunior.com`,
        senha_user: "123456",
        tipo_user: "cliente"
        // faltando telefone_user e empresa_user
      });

    expect(resposta.status).toBe(400);
    expect(resposta.body).toHaveProperty('erro');
  });
});

describe('Admin', () => {
  it('deve retornar 201 ao criar um novo admin com dados de membro', async () => {
    const resposta = await request(app)
      .post('/api/usuario')
      .send({
        nome_user: "Admin Teste",
        email_user: `admin_${Date.now()}@compjunior.com`,
        senha_user: "admin123",
        tipo_user: "admin",
        nome_membro: "Admin Teste",
        data_nascimento_membro: "1990-01-01",
        email_inst_membro: "admin@compjunior.com",
        cargo_membro: "Líder Técnico",
        telefone_membro: "(35) 99999-9999",
        genero_membro: "Masculino",
        foto_membro: "admin.jpg",
        data_ingress_membro: "2023-01-01"
      });

    expect(resposta.status).toBe(201);
    expect(resposta.body).toHaveProperty('id_user');
  });

  it('deve retornar 400 se admin enviar foto com extensão inválida', async () => {
    const resposta = await request(app)
      .post('/api/usuario')
      .send({
        nome_user: "Admin Fail",
        email_user: `adminfail_${Date.now()}@compjunior.com`,
        senha_user: "admin123",
        tipo_user: "admin",
        nome_membro: "Admin Fail",
        data_nascimento_membro: "1990-01-01",
        email_inst_membro: "fail@compjunior.com",
        cargo_membro: "Coordenador",
        telefone_membro: "(35) 98888-0000",
        genero_membro: "Outro",
        foto_membro: "admin.pdf", // ❌ inválido
        data_ingress_membro: "2023-01-01"
      });

    expect(resposta.status).toBe(400);
    expect(resposta.body).toHaveProperty('erro');
  });
});
