module.exports = exports = (req, res, next) => {
    next({
        status: 404,
        message: `Page not found for requested url ${req.url}`
    });
};