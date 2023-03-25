// Project import
const { Server, User, Conversation, Message } = require('../../models');

// ======================================== SERVICE: SERVER =======================================

const getUser = async (id) => {
    try {
        const server = await Server.findById(id).populate('members');
        if (!server) {
            return false;
        }

        return server;
    } catch (error) {
        console.log(error);
        throw new Error('Error get All Server');
    }
};

module.exports = { getUser };
