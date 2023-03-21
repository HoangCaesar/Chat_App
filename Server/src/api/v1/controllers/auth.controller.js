// Project import
const { AuthService } = require('../services');

// ======================================== AUTH CONTROLLER =======================================

// POST: api/v1/user/signin
const signIn = async (req, res, next) => {
    try {
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

module.exports = {
    signIn,
    register,
};
