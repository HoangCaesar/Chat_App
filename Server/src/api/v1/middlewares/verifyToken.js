const jwt = require('jsonwebtoken');
const { promisify } = require('util');

// Project Import
const { User } = require('../models');
// ========================================== VERIFY TOKEN MIDDLEARE ===============================================

const verifyToken = async (req, res, next) => {
    try {
        // 1) Getting token and check if it's there
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        } else if (req.body.token) {
            token = req.body.token;
        }

        console.log(token);

        if (!token) {
            return res.status(401).json({
                message: 'You are not logged in! Please log in to get access.',
            });
        }
        // 2) Verification of token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);

        // 3) Check if user still exists

        const this_user = await User.findById(decoded.userId);
        if (!this_user) {
            return res.status(401).json({
                message: 'The user belonging to this token does no longer exists.',
            });
        }
        // 4) Check if user changed password after the token was issued
        if (this_user.changedPasswordAfter(decoded.iat)) {
            return res.status(401).json({
                message: 'User recently changed password! Please log in again.',
            });
        }

        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = this_user;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = verifyToken;
