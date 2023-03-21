const router = require('express').Router();

const { AuthController } = require('../controllers')

router.post('/signin', AuthController.signIn);

// Register Process
router.post('/register', AuthController.register, AuthController.sendOTP);
router.post("/send-otp", AuthController.sendOTP);
router.post("/verify-otp", AuthController.verifyOTP);

// Password Process
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);

module.exports = router;
