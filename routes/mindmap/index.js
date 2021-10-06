const express = require('express');
const router = express.Router();
const ctr = require('./mindmap.controller');

/* GET home page. */
router.get('/', ctr.main);
router.get('/login', ctr.login);
router.get('/list', ctr.list);
router.get('/register', ctr.register);
router.get('/delete', ctr.delete);

module.exports = router;