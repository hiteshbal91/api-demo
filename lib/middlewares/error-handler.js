module.exports = exports = (error, req, res) => {
    res.status(error.status || 500).json({
        message: error.message
    });
};