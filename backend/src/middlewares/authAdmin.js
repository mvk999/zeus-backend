const jwt = require('jsonwebtoken');

function authAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET || 'segredoSuperSeguro', (err, decoded) => {
    if (err) {
      return res.status(403).json({ erro: 'Token inválido' });
    }

    if (decoded.tipo !== 'admin') {
      return res.status(403).json({ erro: 'Acesso restrito a administradores' });
    }

    req.user = decoded; // inclui o id e tipo do usuário no req
    next();
  });
}

module.exports = authAdmin;
