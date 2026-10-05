const express = require('express');
const controller = require('../controllers/solicitacoes.controller');
const { createSolicitacaoRules } = require('../validators/solicitacoes');
const { validate } = require('../middleware/validation');
const rateLimit = require('express-rate-limit');

const router = express.Router();
const publicLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false });
router.post('/', publicLimiter, createSolicitacaoRules, validate, controller.criar);
module.exports = router;
