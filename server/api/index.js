const express = require('express');
const router = express.Router();

router.use(express.json());

router.use('/auth', require('./auth'));
router.use('/schools', require('./schools'));
router.use('/students', require('./students'));

module.exports = router;
