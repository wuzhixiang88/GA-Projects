const sessionUserInfo = (req, res, next) => {
    res.locals.userid = req.session.userid
    res.locals.username = req.session.username;
    res.locals.firstname = req.session.firstname;
    next();
};

module.exports = sessionUserInfo;