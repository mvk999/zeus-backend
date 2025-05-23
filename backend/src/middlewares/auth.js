//arq para gerar o token de login
const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'segredoSuperSeguro', (err, usuario) => {
    if (err) {
      return res.status(403).json({ erro: 'Token inválido' });
    }

    req.usuario = usuario;
    next();
  });
}

module.exports = autenticarToken;
