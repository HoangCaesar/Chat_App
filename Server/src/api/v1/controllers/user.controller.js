// Project import

// ======================================== USER CONTROLLER =======================================

// GET: api/v1/user/get-user
const getUser = async (req, res, next) => {
    const user = req.user;
    try {
        res.status(200).json({
            status: 'success',
            user,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUser,
};
