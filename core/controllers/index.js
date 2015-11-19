'use strict';

/**
 * Module Dependencies.
 */

var Router = require('express').Router()

module.exports = exports = Router;

// name-spacing for the products
Router.use("/products", require('./products'));

// name-spacing for the categories
Router.use("/categories", require('./categories'));
