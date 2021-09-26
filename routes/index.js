const express = require('express');
const router = express.Router();

const main = require('./main/index');
const member = require('./member/index')

router.use('/main', main);
router.use('/member', member);

module.exports = router;