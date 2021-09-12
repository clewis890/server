module.exports = (req, res, next) => {
    if (!req.user) {
         // return 401 not authorized if not logged in
        return res.status(401).send({ error: 'You must log in!'})
    }

    next();
};