'use strict';

/**
 * Module Dependencies.
 */

var _ = require('lodash');

var options = ["limit", "skip"],
    idRegExp = /^[0-9a-fA-F]{24}$/g,
    helper;

module.exports = exports = helper = {};

helper.merge = function(body, query) {
    _.merge(body, query, function(a, b) {
        if (_.isArray(a)) {
            return a.concat(b);
        }
    });
    return body;
};

helper.validateId = function(ObjectID) {
    return idRegExp.test(ObjectID);
};

helper.getQueryOptions = function(query) {
    var _options = {},
        _query = _.clone(query, true);

    _query = helper.merge(_query, _query.query);
    //removing the merged query
    delete _query['query'];

    for(var key in _query) {
        if(options.indexOf(key) > -1) {
            _options[key] = _query[key];
            delete _query[key];
        }
    }
    return {query: _query, options: _options};
};