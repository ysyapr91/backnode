const express = require('express');
const router = express.Router();
const controller = require('./member.controller');

/* GET users listing. */
router.get('/', controller.users);
router.get('/list', controller.list);

module.exports = router;