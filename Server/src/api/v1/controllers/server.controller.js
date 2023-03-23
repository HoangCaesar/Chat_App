require('dotenv').config();
// Project import
const { ServerService } = require('../services');

// ======================================== AUTH CONTROLLER =======================================

// POST: api/v1/server/create
const createServer = async (req, res, next) => {
    const { name, creator } = req.body;
    try {
        const response = await ServerService.create(name, creator);
        if (!response) {
            return res.status(400).json({
                status: 'error',
                message: 'Wrong ID',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Server is created',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createServer,
};
