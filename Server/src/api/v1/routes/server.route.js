const router = require('express').Router();

const { ServerController } = require('../controllers');

router.post('/create', ServerController.createServer);

module.exports = router;
