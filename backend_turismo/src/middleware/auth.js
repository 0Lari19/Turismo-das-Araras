const jwt = require('jsonwebtoken');
const env = require('../config/env');

function authenticateJwt(req, res, next) {
  const header = req.get('Authorization') || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ erro: { codigo: 'NAO_AUTENTICADO', mensagem: 'Autenticação necessária.', requestId: req.requestId } });
  }

  try {
    req.user = jwt.verify(token, env.jwtSecret, {
      issuer: env.jwtIssuer,
      audience: env.jwtAudience,
      algorithms: ['HS256']
    });
    next();
  } catch {
    return res.status(401).json({ erro: { codigo: 'TOKEN_INVALIDO', mensagem: 'Credenciais inválidas.', requestId: req.requestId } });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.papel)) {
      return res.status(403).json({ erro: { codigo: 'SEM_PERMISSAO', mensagem: 'Você não possui permissão para esta operação.', requestId: req.requestId } });
    }
    next();
  };
}

module.exports = { authenticateJwt, requireRole };
