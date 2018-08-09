const Config = require('../config.js');
const Adaptor = require(`./${Config.get('database.adaptor')}`);

module.exports = Adaptor(Config.get('database.config'));