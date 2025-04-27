const express = require('express');

/**
 * CORS
 */
const cors = require('cors');

const whitelist = ['http://localhost:3000', 'http://example2.com']

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};


module.exports = function(app){
        
    /**
     * ROUTES
     */
    
    
    const auth = require('./Routes/auth');
    const main = require('./Routes/main');

    app.use(cors());

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));   // Used with FORMS. The name of the input will be found as req.body.email


    /**
     * ROUTES
     */
    app.use('/', auth);
    app.use('/auth', auth);
    app.use('/main', main);

};