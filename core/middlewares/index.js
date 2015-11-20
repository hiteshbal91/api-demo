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
    context = require('./domain-context'),
    requestLogger = require('./request-logger');

function Middlewares(app) {
    // setting the env variable
    app.set('env', config.env);

    // setting the context for the incoming requests
    app.use(context())

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

Middlewares.notFound = function(app) {

}

Middlewares.errorHandlers = function(app) {
    // catch 404 and error handler - last handler for the incoming requests
    app.use(function(err, req, res, next) {
        if(!err) {
            err = new Error('Not Found');
            err.status = 404;
        }
        logger.debug({error: err.messge});
        res.status(err.status || 500).jsonp({error: err.message});
    });
};

module.exports = Middlewares;
