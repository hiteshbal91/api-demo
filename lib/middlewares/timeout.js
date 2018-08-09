const OnHeaders = require('on-headers');

module.exports = exports = (req, res, next) => {
    req.startTime = new Date();
    // setting timer for timeout
    const Timer = setTimeout(() => {
        if (!res._headerSent) {
            res.status(504).json({
                message: `Request for ${req.url} is timedout.`
            });
        }
    }, 30000);

    // clearing all resource and sockets
    OnHeaders(res, () => {
        clearTimeout(Timer);
    });

    next();
};