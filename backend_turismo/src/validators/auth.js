const { body } = require('express-validator');

const registerRules = [
  body('nome').trim().isLength({ min: 2, max: 120 }).withMessage('nome deve ter entre 2 e 120 caracteres.'),
  body('email').trim().isEmail().normalizeEmail().withMessage('e-mail inválido.'),
  body('senha').isLength({ min: 8, max: 72 }).withMessage('senha deve ter entre 8 e 72 caracteres.')
];

const loginRules = [
  body('email').trim().isEmail().normalizeEmail().withMessage('e-mail inválido.'),
  body('senha').isString().isLength({ min: 1, max: 72 }).withMessage('senha inválida.')
];

module.exports = { registerRules, loginRules };
