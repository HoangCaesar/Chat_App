const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Project import
const { appDatabase } = require('../databases/init.multi.mongodb');
const modelOptions = require('./modelOptions');

// ========================================== USER MODEL ===============================================

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First Name is required'],
        },
        lastName: {
            type: String,
            required: [true, 'Last Name is required'],
        },
        avatar: {
            type: String,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            validate: {
                validator: function (email) {
                    return String(email)
                        .toLowerCase()
                        .match(
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        );
                },
                message: (props) => `Email (${props.value}) is invalid!`,
            },
        },
        password: {
            type: String,
        },
        passwordChangedAt: {
            type: Date,
        },
        passwordResetToken: {
            type: String,
        },
        passwordResetExpires: {
            type: Date,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        updatedAt: {
            type: Date,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        otp: {
            type: String,
        },
        otp_expiry_time: {
            type: Date,
        },
        friends: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
            },
        ],
        socket_id: {
            type: String,
        },
        status: {
            type: String,
            enum: ['Online', 'Offline'],
        },
    },
    modelOptions
);

// verify OTP
UserSchema.methods.correctOTP = function (candidateOTP, userOTP) {
    return candidateOTP === userOTP;
};

// verify PASSWORD
UserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = appDatabase.model('user', UserSchema);

module.exports = {
    User,
};
