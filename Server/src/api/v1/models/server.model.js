const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Project import
const { appDatabase } = require('../databases/init.multi.mongodb');
const modelOptions = require('./modelOptions');

// ========================================== SERVER MODEL ===============================================

const ServerSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Server Name is required'],
        },
        creator: {
            type: String,
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        conversations: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Message',
            },
        ],
        created_at: {
            type: Date,
            default: Date.now,
        },
    },
    modelOptions
);

const Server = appDatabase.model('Server', ServerSchema);

module.exports = {
    Server,
};
