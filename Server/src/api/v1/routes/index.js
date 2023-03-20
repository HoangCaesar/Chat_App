const express = require('express');
const router = express.Router();

/* GET home page. */
router.use('/auth', require('./auth.route'));
router.use('/user', require('./user.route'));

module.exports = router;
