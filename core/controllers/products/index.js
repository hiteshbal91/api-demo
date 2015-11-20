'use strict';

/**
 * Module Dependencies.
 */

var _ = require('lodash'),
    Router = require('express').Router();

var productsModel = require('./../../model/products'),
    helper = require('./../../utils/helper');

module.exports = exports = Router;

Router
    .route("/")
    .get(function (req, res, next) {
        var _options = helper.getQueryOptions(req.query);
        /*
            Categories population is ignored as it takes more amount of time to resolve on mongoDB
            and also affects the performance.
        */
        productsModel
            .find(_options.query, {}, _options.options, function(err, documents) {
                if(!err) {
                    res.jsonp(documents);
                } else {
                    next(err);
                }
            });
    })
    /*
     Create new product
    */
    .post(function (req, res, next) {
        try {
            var product = new productsModel(req.body);
            product.save(function(err, doc) {
                if(!err) {
                    res.status(201).jsonp(doc);
                } else {
                    next(err)
                }
            });
        } catch(e) {
            next(e);
        }
    });

Router
    /*
     Update exiting product
     */
    .route("/:product_id")
    .get(function (req, res) {
        var productId = req.params.product_id;
        // to avoid cast error
        if (helper.validateId(productId)) {
            productsModel
                .findById(productId, function (err, document) {
                    if (!err) {
                        res.jsonp(document);
                    } else {
                        res.status(404).jsonp({error: "Product not found."});
                    }
                });
        } else {
            next();
        }
    });
