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

// GET: api/v1/server
const getAllServer = async (req, res, next) => {
    try {
        const response = await ServerService.getAll();
        if (!response) {
            return res.status(400).json({
                status: 'error',
                message: 'Can not get server list.',
            });
        }

        res.status(200).json({
            status: 'success',
            message: response,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createServer,
    getAllServer
};
