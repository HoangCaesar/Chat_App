const jwt = require('jsonwebtoken');
require('dotenv').config();
// ========================================== HELPER: OBJECT FILTER ===============================================

const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET_KEY);

module.exports = signToken;
