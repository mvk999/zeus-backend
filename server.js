const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Conectado ao MySQL com sucesso!');
  console.log(`Servidor rodando na porta ${PORT}`);
});
