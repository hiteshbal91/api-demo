const JWT = require('jsonwebtoken');
const _ = require('lodash');

const Config = require('./config');
/**
 * Tokens
 * Class to create multiple objects of tokens
 */
class Tokens {
    static sign(payload, secretKey = Config.get('secretKey'), options = {}) {
        return new Promise((resolve, reject) => {
            JWT.sign(payload, secretKey, options, (error, response) => {
                // JWT.sign(payload, (error, response) => {
                if (error) return reject(error);
                return resolve(response);
            });
        });
    }

    static verify(payload, secretKey = Config.get('secretKey')) {
        return new Promise((resolve, reject) => {
            JWT.verify(payload, secretKey, (error, response) => {
                // JWT.verify(payload, (error, response) => {
                if (error) return reject(error);
                return resolve(response);
            });
        });
    }
}

module.exports = Tokens;