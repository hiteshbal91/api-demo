// loading modules
const Express = require('express');
const _ = require('lodash');
const Router = Express.Router();


// loading custom models
const {
    Tokens
} = require('./../utils');
const User = {
    firstName: "Abc",
    username: "abc",
    password: "abc" // not recommended to store plain password always use hashed
};

module.exports = exports = Router;

Router
    .get('/sign-in', (req, res, next) => {
        if (req.query.username === User.username && req.query.password === User.password) {
            const Payload = _.omit(User, ['password']);
            Payload.time = new Date();
            return Tokens.sign(Payload)
                .then((token) => {
                    res.clearCookie('token', {
                        path: '/'
                    });
                    res.cookie('token', token, {
                        path: '/'
                    });
                    res.json({
                        token
                    });
                })
                .catch(error => next(error));
        }
    });