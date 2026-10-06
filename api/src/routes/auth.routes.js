const express = require('express');
const controller = require('../controllers/auth.controller');
const { registerRules, loginRules } = require('../validators/auth');
const { validate } = require('../middleware/validation');

const router = express.Router();
router.post('/register', registerRules, validate, controller.register);
router.post('/login', loginRules, validate, controller.login);
router.post('/logout', controller.logout);
module.exports = router;
