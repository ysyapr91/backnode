const express = require('express');
const router = express.Router();

const main = require('./main/index');
const member = require('./member/index');
const mindmap = require('./mindmap/index');

router.use('/main', main);
router.use('/member', member);
router.use('/mindmap', mindmap);

module.exports = router;