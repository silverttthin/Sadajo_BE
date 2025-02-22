const isAuthenticated = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized: Please log in first' });
};

module.exports = isAuthenticated;