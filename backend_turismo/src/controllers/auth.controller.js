const service = require('../services/auth.service');

async function register(req, res, next) {
  try { res.status(201).json(await service.register(req.body)); } catch (e) { next(e); }
}

async function login(req, res, next) {
  try { res.status(200).json(await service.login(req.body)); } catch (e) { next(e); }
}

function logout(req, res) { res.status(204).send(); }

module.exports = { register, login, logout };
