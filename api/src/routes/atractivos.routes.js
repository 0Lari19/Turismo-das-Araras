const express = require('express');
const controller = require('../controllers/atractivos.controller');

const router = express.Router();

router.get('/', controller.listar);
router.get('/publicados', controller.listarPublicados);
router.get('/:slug', controller.porSlug);
module.exports = router;