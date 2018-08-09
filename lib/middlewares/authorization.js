const {
    Tokens
} = require('./../utils');
const Error = {
    status: 401,
    message: `Unauthorised access for requested resource`
};

module.exports = exports = (req, res, next) => {
    // signin url should be exception
    if (req.path === '/sign-in')
        return next();

    const Token = req.header.token || req.cookies.token;
    if (Token) {
        return Tokens.verify(Token)
            .then(() => next())
            .catch((error) => {
                console.log("error :", error);
                return next(Error);
            });
    }

    next(Error);
};