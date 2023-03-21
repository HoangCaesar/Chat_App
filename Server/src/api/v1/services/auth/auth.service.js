const otpGenerator = require('otp-generator');

// Project import
const { User } = require('../../models/user.model');
const objectFilter = require('../../helpers/objectFilter');
const signToken = require('../../helpers/signToken');

// ======================================== SERVICE: VERIFY REGISTERATION =======================================

const verifyUser = async (email, password) => {
    try {
        const user = await User.findOne({ email: email }).select('+password');

        if (!user || !user.password) {
            // Incorrect password
            return 'PASSWORD';
        }

        if (!user || !(await user.correctPassword(password, user.password))) {
            // Email or password is incorrect
            return 'EMAIL-PASSWORD';
        }

        const token = signToken(user._id);

        return { token, uid: user._id };
    } catch (error) {
        throw new Error('Error verify User');
    }
};

const verifyRegistration = async (data) => {
    const { _firstName, _lastName, email, _password } = data;
    try {
        const filteredBody = objectFilter(data, 'firstName', 'lastName', 'email', 'password');

        const existing_user = await User.findOne({ email: email });

        if (existing_user && existing_user.verified) {
            // user with this email already exists, Please login
            return false;
        } else if (existing_user) {
            // if not verified than update prev one

            await User.findOneAndUpdate({ email: email }, filteredBody, {
                new: true,
                validateModifiedOnly: true,
            });

            return existing_user;
        } else {
            // if user is not created before than create a new one
            const new_user = await User.create(filteredBody);

            return new_user;
        }
    } catch (error) {
        throw new Error('Error registering');
    }
};

const generateOTP = async (userId) => {
    try {
        const new_otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });

        const otp_expiry_time = Date.now() + 10 * 60 * 1000; // 10 Mins after otp is sent

        const user = await User.findByIdAndUpdate(userId, {
            otp_expiry_time,
        });

        user.otp = new_otp.toString();

        await user.save({ new: true, validateModifiedOnly: true });

        return { user, new_otp };
    } catch (error) {
        throw new Error('Error send OTP');
    }
};

const verifyOTP = async (email, otp) => {
    try {
        const user = await User.findOne({
            email,
            otp_expiry_time: { $gt: Date.now() },
        });

        if (!user) {
            // Email is verified or otp is expired
            return 'EMAIL-OTP';
        }

        if (user.verified) {
            // Email is verified
            return 'EMAIL';
        }

        if (!(await user.correctOTP(otp, user.otp))) {
            // OTP is incorrect
            return 'OTP';
        }

        // OTP is correct

        user.verified = true;
        user.otp = undefined;
        await user.save({ new: true, validateModifiedOnly: true });

        const token = signToken(user._id);

        return { token, uid: user._id };
    } catch (error) {
        throw new Error('Error verify OTP');
    }
};

module.exports = {
    verifyRegistration,
    generateOTP,
    verifyOTP,
    verifyUser,
};
