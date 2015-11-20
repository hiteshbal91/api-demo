'use strict';

/**
 * Module Dependencies.
 */

var mongoose = require ("mongoose");

var config = require('./../../config');

function Model(mode) {
    try {
        var settings = config.mongo,
            defaultUrl = (mode == 'test') ? "mongodb://localhost:27017/test-ecomdemo" : "mongodb://localhost:27017/ecomdemo",
            uriString;

        // to debug the mongoose queries and operations
        if(mode == 'test') {
            mongoose.set('debug', settings.debug);
            settings.dbName = "test-"+settings.dbName;
        }

        // connecting to mongodb
        uriString = (settings && settings.url && settings.dbName) ? settings.url + ":" + (settings.port || 27017) + "/" + settings.dbName : defaultUrl;
        mongoose.connect(uriString);

        // on error event close the db connection
        mongoose.connection.on('error', function callback(err) {
            console.error("Database connection error: ", err.message);
            mongoose.connection.close();
            process.exit(1);
        });
        // database open event
        mongoose.connection.once('connected', function callback() {
            console.log("Database connection successful.");
        });
    } catch(err) {
        console.log("Exception in connecting to DB:", err.message, err.stack);
        process.exit(0);
    }
};

module.exports = Model;