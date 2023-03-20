const router = require('express').Router();

router.get('/get-users', (req, res, next) => {
    res.send('user');
});

module.exports = router;
