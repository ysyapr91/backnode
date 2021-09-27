const express = require('express');
const router = express.Router();
const ctr = require('./main.controller');

/* GET home page. */
router.get('/', ctr.main);

module.exports = router;