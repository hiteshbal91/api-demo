'use strict';

/**
 * Module Dependencies.
 */
var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    categories;

// categories schema/structure
var categoriesSchema = new Schema({
        name: {
            type: String,
            required: true,
            trim: true,
            index: true,
            unique: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        }
    }, {
        collection: 'categories',
        minimize: false, // used mostly to remove the empty objects
        validateBeforeSave: true, // default is also true
        versionKey: false    // "_version" keyname if false version will be hidden
    });

categories = mongoose.model('categories', categoriesSchema);

module.exports = exports = categories;
