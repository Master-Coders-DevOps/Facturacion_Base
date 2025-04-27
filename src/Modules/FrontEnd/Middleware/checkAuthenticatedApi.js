
module.exports = function (req, res, next) {

    if(req.session.user != undefined) {
        if(req.session.user.username != "") {
            console.log('Middleware-1: Autenticado');
            return next();
        }
    }

    console.log('Middleware-1: [401] No autenticado');

    response_message = {
        "flash": "danger",
        "msg": "[401] No autenticado",
        "redirect": "/auth"
    }
    req.flash('danger', '[401] No autenticado');
    
    return res.send(response_message);

};