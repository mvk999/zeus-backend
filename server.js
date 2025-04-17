const DAOusuario = require('./src/dao/DAOusuario');
const usuario = require('./src/models/usuario');

// teste so pra ver se o BD ta puxando tudo certinho
DAOusuario.listarTodos((err, usuarios) => {
  if (err) {
    console.error('Erro ao listar usuários:', err);
  } else {
    console.log('Usuários encontrados:');
    console.log(usuarios);
  }
});
