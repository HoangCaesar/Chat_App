const router = require('express').Router();

const { AuthController } = require('../controllers')

router.post('/signin', AuthController.signIn);

router.post('/register', AuthController.register, AuthController.sendOTP);
router.post("/send-otp", AuthController.sendOTP);
router.post("/verify-otp", AuthController.verifyOTP);

module.exports = router;
