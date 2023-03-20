// Project import
const {} = require('../services');

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
    const { firstName, lastName, email, password } = req.body;
    try {
        res.json({
            status: 'success',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    signIn,
    register,
};
