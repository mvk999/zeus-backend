//arq para verificar o token de login quando o usuario tenta acessar uma rota protegida
const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido.' });
  }

  const [, token] = authHeader.split(' '); // Formato: "Bearer TOKEN"

  jwt.verify(token, process.env.JWT_SECRET || 'segredoSuperSeguro', (err, decoded) => {
    if (err) {
      return res.status(401).json({ erro: 'Token inválido.' });
    }

    req.usuario = decoded; // Adiciona dados do usuário no req
    next(); // Passa para o próximo middleware/controller
  });
}

module.exports = autenticar;
