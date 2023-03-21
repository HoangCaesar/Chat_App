const sgMail = require('@sendgrid/mail');
require('dotenv').config();
// Project import
const { SG_EMAIL_API_KEY, FROM_EMAIL } = process.env;

// ======================================== SERVICE: SEND MAIL/OTP =======================================
const sendMail = async ({ to, subject, html, attachments }) => {
    sgMail.setApiKey(SG_EMAIL_API_KEY);
    try {
        const msg = {
            to: to,
            from: FROM_EMAIL,
            subject: subject,
            html: html,
            attachments,
        };

        await sgMail.send(msg);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { sendMail };
