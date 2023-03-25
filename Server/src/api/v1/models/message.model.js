const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Project import
const modelOptions = require('./modelOptions');
const { appDatabase } = require('../databases/init.multi.mongodb');

// ========================================== USER MODEL ===============================================
const messageSchema = new Schema(
    {
        messages: {
            to: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
            },
            from: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
            },
            type: {
                type: String,
                enum: ['msg', 'divider'],
            },
            subType: {
                type: String,
                enum: ['img', 'doc', 'reply', 'link', 'text'],
            },
            created_at: {
                type: Date,
                default: Date.now(),
            },
            text: {
                type: String,
            },
            file: {
                type: String,
            },
        },
        server: {
            type: String,
        },
    },
    modelOptions
);

const Message = appDatabase.model('Message', messageSchema);
module.exports = {
    Message,
};
