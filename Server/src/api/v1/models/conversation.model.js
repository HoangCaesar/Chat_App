const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Project import
const modelOptions = require('./modelOptions');
const { appDatabase } = require('../databases/init.multi.mongodb');

// ========================================== USER MODEL ===============================================
const conversationSchema = new Schema(
    {
        participants: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
            },
        ],
        messages: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Message',
            },
        ],
        server: {
            type: String,
        },
    },
    modelOptions
);

const Conversation = appDatabase.model('Conversation', conversationSchema);
module.exports = {
    Conversation,
};
