const router = require('express').Router();
const { UserController } = require('../controllers');
const verifyToken = require('../middlewares/verifyToken')

router.get('/get-user', verifyToken);

module.exports = router;
