const express = require('express');
const handleRefresh = require('../controllers/refreshController.js');
const router = express.Router();

router.get('/',handleRefresh);

module.exports = router;