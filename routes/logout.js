const express = require('express');
const handleLogout = require('../controllers/logoutController.js');
const router = express.Router();

router.get('/',handleLogout);

module.exports = router;