'use strict';

var config = {
    // database and application configuration
    mongo: {
        url: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost",
        port: 27017,
        dbName: "ecomdemo"
    },
    port: 5000,
    env: process.env.NODE_ENV || "development"
};

// setting the root path for the project
config.root = process.env.ROOTPATH || process.cwd();

// setting the headers for the project
config.headers = {
    'X-Powered-By': "HDB"
};

// setting logging pattern for the project
config.logs = {
    pattern: "timestamp :: [method] - originalUrl:(statusCode) from [ip]",
    variables: ["timestamp", "method", "originalUrl", "statusCode", "ip"],
    level: "debug",
    path: "./logs"
};

module.exports = exports = config;
