require('dotenv').config();
// Project import
const { AuthService, MailService } = require('../services');
const otpMail = require('../templates/sendOtp');
const resetMail = require('../templates/resetPassword');

// ======================================== AUTH CONTROLLER =======================================

// POST: api/v1/user/signin
const signIn = async (req, res, next) => {
    let { email, password, location } = req.body;
    try {
        if (!email || !password) {
            res.status(400).json({
                status: 'error',
                message: 'Both email and password are required',
            });
            return;
        }

        const response = await AuthService.verifyUser(email, password, location);

        switch (response) {
            case 'PASSWORD':
                res.status(400).json({
                    status: 'error',
                    message: 'Incorrect password',
                });
                break;
            case 'EMAIL-PASSWORD':
                res.status(400).json({
                    status: 'error',
                    message: 'Email or password is incorrect',
                });
                break;
            default:
                res.status(200).json({
                    status: 'success',
                    message: 'Logged in successfully!',
                    token: response.token,
                    user_id: response.uid,
                    location: response.location
                });
        }
    } catch (error) {
        next(error);
    }
};

// POST: api/v1/user/register
const register = async (req, res, next) => {
    try {
        const response = await AuthService.verifyRegistration(req.body);
        if (!response) {
            return res.status(400).json({
                status: 'error',
                message: 'Email already in use, Please login.',
            });
        }

        req.userId = response._id;
        next();
    } catch (error) {
        next(error);
    }
};

// POST: api/v1/user/send-OTP
const sendOTP = async (req, res, next) => {
    const { userId } = req;
    try {
        const { user, new_otp } = await AuthService.generateOTP(userId);

        await MailService.sendMail({
            to: user.email,
            subject: 'OTP Verification',
            html: otpMail(user.firstName, new_otp),
            attachments: [],
        });

        res.status(200).json({
            status: 'success',
            message: 'OTP Sent Successfully!',
        });
    } catch (error) {
        next(error);
    }
};

// POST: api/v1/user/verify-OTP
const verifyOTP = async (req, res, next) => {
    const { email, otp } = req.body;
    try {
        const response = await AuthService.verifyOTP(email, otp);

        switch (response) {
            case 'EMAIL-OTP':
                res.status(400).json({
                    status: 'error',
                    message: 'Email is invalid or OTP expired',
                });
                break;
            case 'EMAIL':
                res.status(400).json({
                    status: 'error',
                    message: 'Email is already verified',
                });
                break;
            case 'OTP':
                res.status(400).json({
                    status: 'error',
                    message: 'OTP is incorrect',
                });
                break;
            default:
                res.status(200).json({
                    status: 'success',
                    message: 'OTP verified Successfully!',
                    token: response.token,
                    user_id: response.uid,
                });
        }
    } catch (error) {
        next(error);
    }
};

// POST: api/v1/user/forgot-password
const forgotPassword = async (req, res, next) => {
    try {
        const response = await AuthService.forgotPassword(req.body);

        if (!response) {
            res.status(404).json({
                status: 'error',
                message: 'There is no user with email address.',
            });
            return;
        }

        const resetURL = `${process.env.WEBAPP_BASE_URL}/new-password/?token=${response.resetToken}`;

        await MailService.sendMail({
            to: response.user.email,
            subject: 'Reset Password',
            html: resetMail(response.user.firstName, resetURL),
            attachments: [],
        });

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!',
        });
    } catch (error) {
        next(error);
    }
};

// POST: api/v1/user/reset-password
const resetPassword = async (req, res, next) => {
    const { token } = req.body;
    try {
        const response = await AuthService.resetPassword(req.body);

        if (!response) {
            res.status(400).json({
                status: 'error',
                message: 'Token is Invalid or Expired',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Password Reseted Successfully',
            token: response.token,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    signIn,
    register,
    sendOTP,
    verifyOTP,
    forgotPassword,
    resetPassword,
};
