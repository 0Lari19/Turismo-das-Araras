const express = require('express');
const { testConnection } = require('../config/db');
const router = express.Router();

router.get('/', async (req, res) => {
  try { await testConnection(); res.json({ status: 'ok', banco: 'ok' }); }
  catch { res.status(503).json({ status: 'indisponivel', banco: 'indisponivel' }); }
});
module.exports = router;
