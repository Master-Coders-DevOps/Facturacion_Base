
module.exports = function (req, res, next) {
    // falta agregar try catch, mejorar la validacion de la existencia de req.session.user

    console.log('user', req.session.user)
    if(req.session.user != undefined) {
        if(req.session.user.username != "") {
            console.log('Middleware-1: Autenticado');

            return next();
            //next();

        }
    }

    console.log('Middleware-1: No autenticado');
    req.flash('danger', '[401] No autenticado');   //esta var de session contiene el msg. si no se puede mostrar con las tablas se debera hacer otro middleware

    return res.redirect('/auth');

};