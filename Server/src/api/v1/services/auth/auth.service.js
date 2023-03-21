const otpGenerator = require("otp-generator");

// Project import
const { User } = require('../../models/user.model');
const objectFilter = require('../../helpers/objectFilter');

// ======================================== SERVICE: VERIFY REGISTERATION =======================================

const verifyRegistration = async (data) => {
    const { firstName, lastName, email, password } = data;
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

module.exports = {
    verifyRegistration,
    generateOTP
};