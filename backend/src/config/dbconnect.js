const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
});

function connectWithRetry() {
  connection.connect(err => {
    if (err) {
      console.error('Erro ao conectar no MySQL, tentando novamente em 5 segundos...', err);
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log('Conectado ao MySQL com sucesso!');
    }
  });
}

connectWithRetry();

module.exports = connection;
