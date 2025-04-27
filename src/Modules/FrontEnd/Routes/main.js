const express = require('express');
const checkAuthenticated = require('../Middleware/checkAuthenticated');
const router = express.Router();


router.get('/', checkAuthenticated, (req, res) => {

    const message = req.flash('success')[0];
    const danger = req.flash('danger')[0];

    res.render('main', {
        message: message,
        danger: danger,
        title: 'Main',
        action: '/auth/logout'
    });
});

module.exports = router;
