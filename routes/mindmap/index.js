const express = require('express');
const router = express.Router();
const ctr = require('./mindmap.controller');

/* GET home page. */
router.get('/', ctr.main);
router.get('/list', ctr.list);

module.exports = router;