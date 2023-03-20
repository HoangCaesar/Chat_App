// Project import
const {  } = require('../services');

// ======================================== AUTH CONTROLLER =======================================
const signIn = async (req, res, next) => {
    try {
        res.json({
            'status': 'success',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    signIn,
};
