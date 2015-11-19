'use strict';

/**
 * Module Dependencies.
 */

var express = require('express'),
    mongoose = require('mongoose');

var config = require('./config'),
    database = require('./core/model'),
    middlewares = require('./core/middlewares'),
    app = express();

// loading all the middlewares
middlewares(app);

// setting the heart of the API
var routes = require('./core/controllers');
app.use(routes);

// loading error handle
middlewares.errorHandlers(app);

// starting the application on the specified port
var server = app.listen(config.port, function() {
    console.info('Application started on the port %d in %s environment', config.port, config.env);
});

// On the end of Node process, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.error('Database connection terminated.');
        process.exit(0);
    });
});

process.on('uncaughtException', function(err) {
    mongoose.connection.close();
    console.error('Caught exception: ', err.message);
    process.exit(0);
});

