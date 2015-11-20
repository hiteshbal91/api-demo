'use strict';

/**
 * Module Dependencies.
 */

var mongoose = require ("mongoose");

var config = require('./../../config');

// to debug the mongoose queries and operations
//mongoose.set('debug', true);

function Model() {
    try {
        var uriString = (config.mongo && config.mongo.url && config.mongo.dbName) ? config.mongo.url + ":" + (config.mongo.port || 27017) + "/" + config.mongo.dbName : "mongodb://localhost:27017/ecomdemo";
        // connecting to mongodb
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

module.exports = Model();