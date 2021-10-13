const express = require('express');
const router = express.Router();
const ctr = require('./mindmap.controller');

/* GET home page. */
router.get('/', ctr.main);
router.get('/search', ctr.search);
router.post('/list', ctr.list);
router.post('/register', ctr.register);

module.exports = router;