'use strict';

/**
 * Module Dependencies.
 */
//
//var Model = require("./../../model/index2");

var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    products;

function getPrice(num) {
    return (num/100).toFixed(2);
}

function setPrice(num) {
    return num*100;
}

var productsSchema = new Schema({
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
        },
        price: {
            type: Number,
            get: getPrice,
            set: setPrice
        },
        categories: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Categories'
            }
        ]
    }, {
        collection: 'products',
        minimize: false, // used mostly to remove the empty objects
        validateBeforeSave: true, // default is also true
        versionKey: false // "_version" keyname if false version will be hidden
    });

products = mongoose.model('products', productsSchema);

module.exports = products;
