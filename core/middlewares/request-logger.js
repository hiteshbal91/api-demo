'use strict';

/**
 * Module Dependencies.
 */

var onHeaders = require('on-headers');

var logger = require('./../utils/logger').get();

module.exports = function(config) {
    return function(req, res, next) {
        try {
            var xRuntime;
            if(!res.xruntime) res.xruntime = new Date();
            onHeaders(res, function() {
                xRuntime = new Date() - this.xruntime;
                this.setHeader('X-Runtime', xRuntime+"ms");
                // setting the configured headers
                for(var key in config.headers) {
                    this.setHeader(key, config.headers[key])
                }
                // setting the up the valid pattern
                var validKeys = config.logs.variables.join("|");
                var regexp = new RegExp("("+validKeys+")", "gi");
                var pattern = config.logs.pattern.replace(regexp, function(match) {
                    var value = "";
                    switch(match) {
                        case "timestamp" :
                            value = new Date().toISOString();
                            break;
                        case "statusCode" :
                            value = this.statusCode;
                            break;
                        default :
                            value = req[match];
                            break;
                    }
                    return value;
                }.bind(this));
                logger.info(pattern);
            });
            next();
        } catch (err) {
            logger.error("System loading issue:", err.message);
            next(err);
        }
    }
};