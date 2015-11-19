'use strict';

/**
 * Module Dependencies.
 */

var _ = require('lodash'),
    Router = require('express').Router(),
    mongoose = require('mongoose');

var categoriesModel = require('./../../model/categories'),
    productsModel = require('./../../model/products'),
    helper = require('./../../utils/helper');

module.exports = exports = Router;

Router
    .route("/")
    /*
     Fetching all the categories
    */
    .get(function (req, res, next) {
        var _options = helper.getQueryOptions(req.query);
        categoriesModel
            .find(_options.query, {}, _options.options, function(err, documents) {
                if(!err) {
                    res.jsonp(documents);
                } else {
                    next(err);
                }
            });
    })
    /*
     Create new category
    */
    .post(function (req, res, next) {
        var category = new categoriesModel(req.body);
        category.save(function(err, doc) {
            if(!err) {
                res.status(201).jsonp(doc);
            } else {
                next(err)
            }
        })
    });

/*
 Loading the category id data to determine if category is valid or not.
*/
Router
    .param('cat_id', function(req, res, next, cat_id) {
        var categoryId = req.params.cat_id;
        // to avoid cast error
        if (helper.validateId(categoryId)) {
            categoriesModel
                .findOne({"_id": categoryId}, function (err, document) {
                    if(err) {
                        next(err);
                    } else {
                        req._category = document;
                        next();
                    }
                });
        } else {
            next();
        }
    });

Router
    .route("/:cat_id/products")
    /*
        Fetching all the products of specified category
    */
    .get(function(req, res, next) {
        if(req._category) {
            var _query = _.merge(req.query, {"categories": {"$in": [req._category._id]}});

            productsModel
                .find(_query, {}, {}, function(err, documents) {
                    if(!err) {
                        res.jsonp(documents);
                    } else {
                        next(err);
                    }
                });
        } else {
            res.status(404).jsonp({error: "Category not found."});
        }
    });