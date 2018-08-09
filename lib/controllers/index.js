const Battles = require('./battles.js');
const SignIn = require('./signin.js');

module.exports = exports = (Application) => {
    Application.use(Battles);
    Application.use(SignIn);
};