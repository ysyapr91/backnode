const express = require('express');
const router = express.Router();
const ctr = require('./member.controller');

/* GET users listing. */
router.get('/', ctr.main);
router.post('/login', ctr.login);
router.get('/logout', ctr.logout);
router.get('/register', ctr.register);
router.get('/list', ctr.check, ctr.list);

module.exports = router;