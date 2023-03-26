// Project Import
const { User, Message, Conversation } = require('./api/v1/models');

// ========================================== SOCKET - SETTING SOCKET ===============================================

const socket = async (io) => {
    io.on('connection', async (socket) => {
        let user_id = socket.handshake.query['user_id'];
        if (user_id === 'null') {
            user_id = null;
        }

        console.log(`User connected ${socket.id}`);

        if (Boolean(user_id)) {
            await User.findByIdAndUpdate(user_id, {
                socket_id: socket.id,
                status: 'Online',
            });
        }

        socket.on('greeting_message', async (data) => {
            const conversations = await Conversation.find({
                participants: { $all: [data.user_id] },
            })
                .populate('participants')
                .populate('messages');

            const from = await User.findById(data.user_id);

            conversations.map(async (conversation) => {
                const to = conversation.participants.filter(
                    (participant) => participant._id.toString() !== data.user_id
                )[0];
                const new_message = new Message({
                    messages: {
                        to: to,
                        from: from,
                        type: 'divider',
                        subType: 'text',
                        created_at: Date.now(),
                        text: `Welcome ${from.firstName} ${from.lastName} logged in from ${data.location}`,
                    },
                    server: null,
                });

                const savedNewMessages = await new_message.save();

                await Conversation.findOneAndUpdate(
                    { _id: conversation._id },
                    { $push: { messages: savedNewMessages } },
                    { new: true, upsert: true }
                );
            });
        });

        // get chat list/conversations
        socket.on('get_direct_conversations', async ({ user_id }, callback) => {
            const existing_conversations = await Conversation.find({
                participants: { $all: [user_id] },
            })
                .populate('participants')
                .populate('messages');

            callback(existing_conversations);
        });

        // Messages for messenger
        socket.on('get_messages', async (data, callback) => {
            const { messages } = await Conversation.findById(data.conversation_id)
                .populate('messages')
                .select('messages');
            callback(messages);
        });

        // Handle incoming text/link messages
        socket.on('text_message', async (data) => {
            const { message, conversation_id, from, to, type, subType } = data;

            const to_user = await User.findById(to);
            const from_user = await User.findById(from);

            const new_message = new Message({
                messages: {
                    to: to,
                    from: from,
                    type: type,
                    subType: subType,
                    created_at: Date.now(),
                    text: message,
                },
                server: null,
            });

            const savedNewMessages = await new_message.save();

            await Conversation.findOneAndUpdate(
                { _id: conversation_id },
                { $push: { messages: savedNewMessages } },
                { new: true, upsert: true }
            );

            // // emit incoming_message -> to user

            io.to(to_user.socket_id).emit('new_message', {
                conversation_id,
                message: new_message,
            });

            // // emit outgoing_message -> from user
            io.to(from_user.socket_id).emit('new_message', {
                conversation_id,
                message: new_message,
            });
        });

        // socket exit
        socket.on('end', async (data) => {
            // Find user by ID and set status as offline
            console.log(data);
            if (data.user_id) {
                await User.findByIdAndUpdate(data.user_id, { status: 'Offline' });
            }

            // broadcast to all conversation rooms of this user that this user is offline (disconnected)
            console.log('closing connection');
            socket.disconnect(0);
        });
    });
};

module.exports = socket;
