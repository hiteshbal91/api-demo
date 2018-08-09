const _ = require('lodash');
const Fs = require('fs');
const Path = require('path');

class Config {
    constructor() {
        //loading default environment variables set at runtime execution
        this.environment = process.env.NODE_ENV || "local";
        this.port = process.env.PORT || 5001;
        this.configPath = process.env.CONFIG_PATH || Path.join(process.cwd(), 'config');

        // loading config file
        if (!Fs.existsSync(Path.join(this.configPath, `${this.environment}.js`))) {
            throw new Error(`${this.environment}.js file doesn't exists at ${this.configPath}`);
        }
        this.config = require(Path.join(this.configPath, `${this.environment}.js`));
        _.merge(this.config, {
            port: this.port
        });
    }

    get(key) {
        return _.split(key, '.').reduce((previous, current) => {
            if (!_.isUndefined(previous)) {
                return previous[current];
            }
        }, this.config);
    }

    set(key, value) {
        // if (!_.isUndefined(this.config[key]))
        this.config[key] = value;
    }
}

module.exports = new Config();