const router = require('express').Router();

const { AuthController } = require('../controllers')

router.post('/signin', AuthController.signIn);

module.exports = router;
