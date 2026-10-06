const { validationResult } = require('express-validator');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      erro: {
        codigo: 'VALIDACAO_INVALIDA',
        mensagem: 'Há campos inválidos.',
        detalhes: errors.array().map(e => ({ campo: e.path, regra: e.msg })),
        requestId: req.requestId
      }
    });
  }
  next();
}

module.exports = { validate };
