const OnHeaders = require('on-headers');

module.exports = exports = (req, res, next) => {
    OnHeaders(res, () => {
        res.set('X-RunTime', `${(new Date() - req.startTime)}ms`);
    });

    next();
};