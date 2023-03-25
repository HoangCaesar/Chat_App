// Project import
const { Server, User, Conversation, Message } = require('../../models');

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

const getOne = async (id) => {
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

// First time a user join a server => gonna create conversations with others
const generateConversations = async (server, user) => {
    try {
        server.members
            .filter((member) => member._id.toString() !== user._id.toString())
            .map(async (member) => {
                const firstMessage = new Message({
                    messages: {
                        to: member,
                        from: user,
                        type: 'Text',
                        text: `${user.firstName} ${user.lastName} join ${server.name} for the first time. Say hello to each other :)`,
                        file: null,
                    },
                    server: server._id,
                });

                const savedMessage = await firstMessage.save();

                const newConversation = new Conversation({
                    participants: [member, user],
                    messages: [savedMessage],
                    server: server._id,
                });

                await newConversation.save();
            });
    } catch (error) {
        console.log(error);
        throw new Error('Error generate Conversations');
    }
};

const addUser = async (serverID, userID) => {
    try {
        let server = await Server.findById(serverID);
        let user = await User.findById(userID);

        if (!server || !user) {
            return false;
        }

        const isExisted = server.members.includes(user._id);

        if (isExisted) {
            return false;
        }

        await Server.findOneAndUpdate(
            { _id: serverID },
            { $push: { members: user } },
            { new: true, upsert: true }
        );

        await User.findOneAndUpdate(
            { _id: userID },
            { $push: { servers: server } },
            { new: true, upsert: true }
        );

        server = await Server.findById(serverID);
        user = await User.findById(userID);

        await generateConversations(server, user);

        return true;
    } catch (error) {
        console.log(error);
        throw new Error('Error add User to Server');
    }
};

module.exports = { create, getAll, getOne, addUser };
