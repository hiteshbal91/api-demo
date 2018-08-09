// Declarations of modules
const AppDebug = require('debug')('BattleAPI:App');
const Express = require('express');
const Router = require('./controllers');

// Custom modules
const {
    Config,
    Database
} = require('./utils');
const {
    CookieParser,
    Authorization,
    RunTime,
    Timeout,
    NotFound,
    ErrorHandler
} = require('./middlewares/index.js');
// init application object
const Application = Express();

// disabled all security exposures
Application.disable('x-powered-by');

// loading all pre-requisite middlewares
Express.json();
Application.use(CookieParser());
// loading timeout
Application.use(Timeout);
// loading runtime
Application.use(RunTime);
// loading Authorization
Application.use(Authorization);

// loading routers
Router(Application);

// loading all post middlewares
// error handler
Application.use(NotFound);
Application.use(ErrorHandler);

function start() {
    // connecting mongoDB
    return Database.connect()
        .then(() => {
            // Config loading
            const Port = Config.get('port');
            const Server = Application.listen(Port, () => {
                console.log(`Application server is running on port ${Port}`);
            });
        });
}

module.exports = exports = {
    Application,
    Database,
    start
}

// catch uncaughtException
process.on('uncaughtException', (error) => {
    console.error({
        error: 'UncaughtException found.',
        message: error.message || error
    });
    process.exit(0);
});

// catch uncaughtException
process.on('unhandledRejection', (error) => {
    console.error({
        error: 'UnhandledRejection found.',
        message: error.message || error
    });
    process.exit(0);
});