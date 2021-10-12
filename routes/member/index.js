const express = require('express');
const router = express.Router();
const ctr = require('./member.controller');

/* GET users listing. */
router.get('/', ctr.main);
router.post('/register', ctr.register);
router.post('/login', ctr.login);
router.get('/logout', ctr.logout);
router.get('/myinfo', ctr.check, ctr.myInfo);
router.get('/list', ctr.check, ctr.list);

module.exports = router;