'use strict';

/**
 * Module Dependencies.
 */
var domain = require('domain');

module.exports = function() {
    return function (req, res, next) {
        var _domain = domain.create();
        _domain.add(req);
        _domain.add(res);

        res.on('finish', function () {
            _domain.exit();
        });

        _domain.on('error', function (err) {
            console.log("Dpma n error : ", err);
            // Once a domain is disposed, further errors from the emitters in that set will be ignored.
            _domain.exit();
            next(err);
        });

        _domain.run(next);
    }
};
