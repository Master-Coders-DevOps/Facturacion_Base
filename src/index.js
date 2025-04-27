const express = require('express');
const app = express();
const session = require('express-session');

require('dotenv').config({ path: __dirname + '/../.env' });

var sessionMiddleware = session({
    secret: 'this_could_be_in_the_env_file',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 } // 24h
});

const flash = require('connect-flash');
app.use(sessionMiddleware);
app.use(flash());

/**
 * Database: MySQL
 */
const { db } = require('./Modules/FrontEnd/Library/database_mysqlConn');
app.set('db', db);

/**
    Load Module Routes
*/
require('./Modules/FrontEnd/routes')(app);


/**
 *  ---------------------------------------------------------------------------------------
 * Sistema de plantillas HBS (habilitandolo por defecto en EXPRESS)
 */
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/Modules/FrontEnd/Views/partials', function (err) { });

app.set('view engine', 'hbs');
app.set("views", __dirname + "/Modules/FrontEnd/Views");

app.use(express.static(__dirname + "/Modules/FrontEnd/public"));
/***
 * ---------------------------------------------------------------------------------------
 */



/**
 * Error 404
 */
app.use(function (req, res, next) {
    res.status(404);
    res.render('404', {
        title: 'No encontrado',
        action: '/auth/logout'
    });
});


function listenServer(port = process.env.SYSTEM_PORT) {
    app.listen(
        port, () => console.log(`Listening on port ${port}...`)
    );
}

async function main() {
    try {
        listenServer(process.env.PORT);
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}

main();

