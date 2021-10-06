const express = require('express');
const router = express.Router();

const main = require('./main/index');
const member = require('./member/index');
const mindmap = require('./mindmap/index');

const path = require('path');
const appRoot = require('app-root-path');
const memberCtr = require(appRoot + '/routes/member/member.controller');

router.get('/', memberCtr.main);

router.use('/main', main);
router.use('/member', member);
router.use('/mindmap', mindmap);

module.exports = router;