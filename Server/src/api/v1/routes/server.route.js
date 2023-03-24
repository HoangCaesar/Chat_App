const router = require('express').Router();

const { ServerController } = require('../controllers');

router.post('/create', ServerController.createServer);
router.get('/all', ServerController.getAllServer);
router.get('/:serverID', ServerController.getOneServer);
router.post('/access', ServerController.accessServer);

module.exports = router;
