const router = require('express').Router();

router.post('/signin', (req, res, next) => {
    res.send('signin');
});

module.exports = router;
