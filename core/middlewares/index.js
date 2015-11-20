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
    // setting the env variable
    app.set('env', config.env);

    // to compress the output result
    app.use(compression());

    // to server favicon
    var faviconPath = path.join(config.root, 'favicon.ico');
    fs.exists(faviconPath, function (exists) {
        if(exists) app.use(favicon(faviconPath));
    });

    // to parse incoming request data with body-parser data such as json/raw/application/x-www-form-urlencoded
    app.use(bodyParser.json({"limit": "2mB"}));
    app.use(bodyParser.raw({"limit": "2mB"}));
    app.use(bodyParser.urlencoded({"extended": true, "limit": "2mB"}));

    // response headers settings and logging the incomging requests
    app.use(requestLogger(config))
};

Middlewares.errorHandlers = function(app) {
    // catch 404 and forward error to the error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler - last handler for the incoming requests
    app.use(function(err, req, res) {
        logger.debug({error: err.messge});
        res.status(err.status || 500).jsonp({error: err.message});
    });
};

module.exports = Middlewares;
