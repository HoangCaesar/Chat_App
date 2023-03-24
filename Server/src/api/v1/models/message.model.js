const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Project import
const modelOptions = require('./modelOptions');

// ========================================== USER MODEL ===============================================
const messageSchema = new Schema(
    {
        participants: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
            },
        ],
        messages: [
            {
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
                    enum: ['Text', 'Media', 'Document', 'Link'],
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
        ],
    },
    modelOptions
);

const Message = new mongoose.model('OneToOneMessage', messageSchema);
module.exports = {
    Message,
};
