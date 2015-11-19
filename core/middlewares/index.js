'use strict';

/**
 * Module Dependencies.
 */

var path = require('path'),
    fs = require('fs'),
    compression = require('compression'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser');

var config = require('./../../config'),
    logger = require('./../utils/logger').get(),
    requestLogger = require('./request-logger');

function Middlewares(app) {
    // setting the env variables
    app.set('env', config.env);

    // compression middleware
    app.use(compression());

    // favicon middleware
    var faviconPath = path.join(config.root, 'favicon.ico');
    fs.exists(faviconPath, function (exists) {
        if(exists) app.use(favicon(faviconPath));
    });

    // body-parser middlewares for json/raw/text/application/x-www-form-urlencoded
    app.use(bodyParser.json({"limit": "2mB"}));
    app.use(bodyParser.raw({"limit": "2mB"}));
    app.use(bodyParser.urlencoded({"extended": true, "limit": "2mB"}));

    // request logger to log the requests
    app.use(requestLogger(config))
};

Middlewares.errorHandlers = function(app) {
    // catch 404 and forward error to next error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler last middleware to invole for a request
    app.use(function(err, req, res) {
        logger.debug({error: err.messge});
        res.status(err.status || 500);
        if (app.get('env') == 'development') {
            res.json({});
        } else {
            res.json({});
        }
    });
};

module.exports = Middlewares;