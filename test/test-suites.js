'use strict';

/**
 * Module Dependencies.
 */
var test = require('tape');

var model = require('./../core/model')('test'),
    categories = require('./../core/model/categories'),
    products = require('./../core/model/products');

var categories;

// categories test cases
test('Categories calls checking', function(TestCase) {
    // checking get call
    TestCase.test("GET all", function(done) {
        categories
            .find({})
            .exec(function(err, docs) {
                if(err) {
                    done.fail('Error in find'+err.message);
                } else {
                    done.pass(docs.length+' Categories presents');
                }
                done.end();
            });
    })

    // checking post call
    TestCase.test("POST call", function(done) {
        var body = {
                "name": "Category1",
                "description": "Category1 description added."
            },
            category = new categories(body);

        category
            .save(function(err, doc) {
                if(err) {
                    done.fail('Error in find'+err.message);
                } else {
                    categories = doc;
                    done.pass("Category created : "+JSON.stringify(doc));
                }
                done.end();
            });
    })
});

// products test cases
test('Products calls checking', function(TestCase) {
    // checking get call
    TestCase.test("Products all", function(done) {
        products
            .find({})
            .exec(function(err, docs) {
                if(err) {
                    done.fail('Error in find'+err.message);
                } else {
                    done.pass(docs.length+' Products presents');
                }
                done.end();
            });
    })

    // checking post call
    TestCase.test("POST call", function(done) {
        var body = {
                "name": "Product1",
                "description": "Product1 description added.",
                "price": 500.05,
                "categories": [categories._id]
            },
            products = new products(body);

        products
            .save(function(err, doc) {
                if(err) {
                    done.fail('Error in find'+err.message);
                } else {
                    done.pass("Product created : "+JSON.stringify(doc));
                }
                done.end();
            });
    })
});
