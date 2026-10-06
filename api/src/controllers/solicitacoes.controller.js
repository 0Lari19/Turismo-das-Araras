const service = require('../services/solicitacoes.service');

async function criar(req, res, next) {
  try { res.status(201).json(await service.criar(req.body)); } catch (e) { next(e); }
}

module.exports = { criar };
