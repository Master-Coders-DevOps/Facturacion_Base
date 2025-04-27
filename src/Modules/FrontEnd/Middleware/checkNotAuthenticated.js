
module.exports = function (req, res, next) {
    if(req.session.user != undefined) {
        if(req.session.user.username != "") {
            return res.redirect('/main');
        }
    }
    next();
};