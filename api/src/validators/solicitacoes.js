const { body } = require('express-validator');

const createSolicitacaoRules = [
  body('nome').trim().isLength({ min: 2, max: 120 }).withMessage('nome inválido.'),
  body('email').trim().isEmail().normalizeEmail().withMessage('e-mail inválido.'),
  body('telefone').optional({ values: 'falsy' }).trim().isLength({ min: 8, max: 20 }).withMessage('telefone inválido.'),
  body('mensagem').trim().isLength({ min: 5, max: 5000 }).withMessage('mensagem inválida.')
];

module.exports = { createSolicitacaoRules };
