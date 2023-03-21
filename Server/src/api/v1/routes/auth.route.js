const router = require('express').Router();

const { AuthController } = require('../controllers')

router.post('/signin', AuthController.signIn);
router.post('/register', AuthController.register);

module.exports = router;
