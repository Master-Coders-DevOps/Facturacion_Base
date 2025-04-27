const express = require('express');
const router = express.Router();
const fs = require('fs');


let trimRequest = require('../Library/Helpers/trim-request');
const checkNotAuthenticated = require('../Middleware/checkNotAuthenticated');


router.get('/', checkNotAuthenticated, (req, res) => {

    const message = req.flash('success')[0];
    const danger = req.flash('danger')[0];

    res.render('login', {
        message: message,
        danger: danger,
        action: '/auth',
        title: 'Login',
    });
});

router.post('/', trimRequest.body, checkNotAuthenticated, async (req, res) => {
    try {
        let variables = fs.readFileSync(__dirname + '/../../../db_credentials.txt');
    
        let data = JSON.parse(variables);
    
        let form = req.body;
    
        if(form.username == "" || form.password == ""){
            req.flash('danger', "Usuario y/o contraseña vacios");
            return res.redirect('/auth');
        }
    
        if(form.username !== data.USERNAME){
            req.flash('danger', "Usuario incorrecto");
            return res.redirect('/auth');
        } 
        
        if(form.password !== data.PASSWORD) {
            req.flash('danger', "Contraseña incorrecta");
            return res.redirect('/auth');
        }
    
        req.session.user = {
            username: data.USERNAME,
            certificate_filename: data.CERTIFICATE_FILENAME,
            certificate_password: data.CERTIFICATE_PASSWORD,
            secondary_user_name: data.SECONDARY_USER_NAME,
            secondary_user_password: data.SECONDARY_USER_PASSWORD,
            ruc: data.ruc,
            nombre_comercial: data.nombre_comercial,
            razon_social: data.razon_social,
            direccion: data.direccion,
            pais: data.pais,
            departamento: data.departamento,
            provincia: data.provincia,
            distrito: data.distrito,
            ubigeo: data.ubigeo,
            celular: data.celular,
            mensaje: data.mensaje,
            serie_facturas: data.serie_facturas,
            serie_boletas: data.serie_boletas,
            serie_nc_facturas: data.serie_nc_facturas,
            serie_nc_boletas: data.serie_nc_boletas,
            plantilla_boletas: data.plantilla_boletas,
            plantilla_facturas: data.plantilla_facturas,
            plantilla_nc: data.plantilla_nc,
            declaracion_automatica: data.declaracion_automatica,
        }

        return res.redirect('/main');


    } catch (error) {
        console.log(error)
    }

})


router.post('/logout', (req, res) => {
    delete req.session.user;
    req.flash('danger', 'Sesion cerrada');

    res.redirect('/auth');
});


module.exports = router;
