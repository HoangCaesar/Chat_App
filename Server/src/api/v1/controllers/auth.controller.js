// Project import
const { AuthService, MailService } = require('../services');
const otpMail = require('../templates/sendOtp');

// ======================================== AUTH CONTROLLER =======================================

// POST: api/v1/user/signin
const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(400).json({
                status: 'error',
                message: 'Both email and password are required',
            });
            return;
        }

        
        res.json({
            status: 'success',
        });
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
                    user_id: response.user._id,
                });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    signIn,
    register,
    sendOTP,
    verifyOTP,
};
