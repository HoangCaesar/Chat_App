const router = require('express').Router();

const { ServerController } = require('../controllers');

router.post('/create', ServerController.createServer);
router.get('/all', ServerController.getAllServer);

module.exports = router;
