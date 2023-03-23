const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Project import
const { appDatabase } = require('../databases/init.multi.mongodb');
const modelOptions = require('./modelOptions');

// ========================================== USER MODEL ===============================================

const userSchema = new Schema(
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
        servers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Server',
            },
        ],
        socket_id: {
            type: String,
        },
        status: {
            type: String,
            enum: ['Online', 'Offline'],
        },
        location: {
            type: String,
        },
    },
    modelOptions
);

// OTP
userSchema.pre('save', async function (next) {
    if (!this.isModified('otp') || !this.otp) return next();

    this.otp = await bcrypt.hash(this.otp.toString(), 12);

    console.log(this.otp.toString(), 'FROM PRE SAVE HOOK');

    next();
});

userSchema.methods.correctOTP = async function (candidateOTP, userOTP) {
    return await bcrypt.compare(candidateOTP, userOTP);
};

// PASSWORD
userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) return next();

    this.password = await bcrypt.hash(this.password, 12);

    next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

// RESET TOKEN
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimeStamp < changedTimeStamp;
    }

    // FALSE MEANS NOT CHANGED
    return false;
};

const User = appDatabase.model('User', userSchema);

module.exports = {
    User,
};
