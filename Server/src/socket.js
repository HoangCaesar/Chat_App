const { User, Message, Server } = require('./api/v1/models');

// ========================================== SOCKET - SETTING SOCKET ===============================================

const socket = async (io) => {
    io.on('connection', async (socket) => {
        // console.log(JSON.stringify(socket.handshake.query));
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

        // get chat list
        // socket.on('get_direct_conversations', async ({ user_id }, callback) => {
        //     const existing_conversations = await Message.find({
        //         participants: { $all: [user_id] },
        //     }).populate('participants');

        //     console.log(existing_conversations);

        //     callback(existing_conversations);
        // });

        // socket exit
        // socket.on('end', async (data) => {
        //     // Find user by ID and set status as offline

        //     if (data.user_id) {
        //         await User.findByIdAndUpdate(data.user_id, { status: 'Offline' });
        //     }

        //     // broadcast to all conversation rooms of this user that this user is offline (disconnected)

        //     console.log('closing connection');
        //     socket.disconnect(0);
        // });
    });
};

module.exports = socket;
