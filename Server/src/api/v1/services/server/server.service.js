// Project import
const { Server, User } = require('../../models');

// ======================================== SERVICE: SERVER =======================================
const create = async (name, creator) => {
    try {
        const user = await User.findById(creator);
        if (!user) return false;

        const newServer = new Server({
            name,
            creator,
            members: creator,
        });

        const savedServer = await newServer.save();

        await User.findOneAndUpdate(
            { _id: creator },
            { $push: { servers: savedServer } },
            { new: true, upsert: true }
        );

        savedServer._doc.members = user;
        return savedServer;
    } catch (error) {
        console.log(error);
        throw new Error('Error create Server');
    }
};

const getAll = async () => {
    try {
        const serverList = await Server.find({}).sort({ createdAt: -1 }).populate('members');
        if (!serverList || serverList.length === 0) {
            return false;
        }

        return serverList;
    } catch (error) {
        console.log(error);
        throw new Error('Error get All Server');
    }
};

module.exports = { create, getAll };
