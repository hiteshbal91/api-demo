var fs = require('fs');
var path = require('path');
var bunyan = require('bunyan');
var mkdirp = require('mkdirp');

var config = require('./../../../config');

function Logger(name) {
    this.name = name || "api";
    var logLevels = ["trace", "debug", "error", "fatal", "warn"];
    this.level = (config.logs && config.logs.level && logLevels.indexOf(config.logs.level)) ? config.logs.level : bunyan.ERROR;

    // creating the default folders using mkdirp for logs
    var logPath = (config.logs && config.logs.path) ? config.logs.path : "./api-logs";

    logPath = path.resolve(config.root, logPath);
    if(!fs.existsSync(logPath)) { mkdirp.sync(logPath, 0777); }

    this.logPath = path.resolve(logPath, this.name.toLowerCase() + "-" + this.level + ".log");
    if(!fs.existsSync(logPath)) { fs.writeFileSync(logPath, "", "utf-8"); }
}

Logger.prototype.get = function() {
    this.logger = bunyan.createLogger({
        name: this.name,
        streams: [{
            type: 'rotating-file',
            level: this.level,
            path: this.logPath,
            period: '1d',   // daily rotation
            count: 3        // keep 3 back copies
        }, {
            level: 'info',
            stream: process.stdout            // log INFO and above to stdout
        }]
    });

    this.logger.on('error', function (err, stream) {
        // Handle stream write or create error here.
        console.error("Logger:", err.message);
    });

    return this.logger;
};

module.exports = new Logger();