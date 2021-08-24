const isUserLoggedIn = (req, res, next) => {
    if (req.session.userid) {
        next();
    } else {
        res.redirect("/user/login");
    }
};

module.exports = isUserLoggedIn;