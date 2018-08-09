const DatabaseDebug = require('debug')('BattleAPI:mongodb');
const _ = require('lodash');
const Mongoose = require('mongoose');

/**
 * Model 
 * Wrapper class for models of mongoose
 */
class Model {

    /**
     * constructor
     * @param {Object} config - current model instance config 
     */
    constructor(config) {
        this.config = config;
    }

    /**
     * connectionString
     * @param {Object} config - config to provide connection string parameters
     * @returns {String} ConnectionUrl
     */
    static connectionString(config) {
        if (_.isArray(config.servers)) {
            config.servers = config.servers.map(server => {
                return `${server.host}:${server.port}`;
            });
            let authentication = '';
            if (config.auth && config.auth.username && config.auth.password)
                authentication = `${encodeURIComponent(config.auth.username)}:${encodeURIComponent(config.auth.password)}@`;

            const URL = `mongodb://${authentication}${config.servers.join(',')}/${config.name}`;
            DatabaseDebug('ConnectionUrl string %s', URL);
            return URL;
        }
        throw new Error('Server should be an array.');
    }

    /**
     * connect
     * Provide function to connect with database using driver.
     */
    connect() {
        const ConnectionUrl = Model.connectionString(this.config);
        return Mongoose.connect(ConnectionUrl, this.config.options)
    }
}

module.exports = function(config) {
    return new Model(config);
};