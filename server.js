const DAOmembro = require('./src/dao/DAOmembro');
const DAOusuario = require('./src/dao/DAOusuario');
const DAOorcamento = require('./src/dao/DAOorcamento');
const usuario = require('./src/models/usuario');
const membro = require('./src/models/membro');
const orcamento = require('./src/models/orcamento');

// teste so pra ver se o BD ta puxando tudo certinho
DAOusuario.listarTodos((err, usuarios) => {
  if (err) {
    console.error('Erro ao listar usuários:', err);
  } else {
    console.log('Usuários encontrados:');
    console.log(usuarios);
  }
});


// teste DAOmembro
DAOmembro.listarTodos((err, membros) => {
  if (err) {
    console.error('Erro ao listar membros:', err);
  } else {
    console.log('Membros encontrados:');
    console.log(membros);
  }
});


// teste DAOorcamento
DAOorcamento.listarTodos((err, orcamentos) => {
  if (err) {
    console.error('Erro ao listar orçamentos:', err);
  } else {
    console.log('Orçamentos encontrados:');
    console.log(orcamentos);
  }
});