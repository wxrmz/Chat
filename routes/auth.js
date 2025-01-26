const express = require('express');
const router = express.Router();
const register = require('../controllers/auth/register');
const login = require('../controllers/auth/login');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
