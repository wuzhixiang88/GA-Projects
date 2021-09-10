const isUserLoggedIn = (req, res, next) => {
    if (req.session.userid) {
        next();

    } else if (
        req.method === "POST" || 
        req.method === "PUT"  || 
        req.method === "PATCH" || 
        req.method === "DELETE" 
    ) {
        res.status(403).send();

    } else {
        res.redirect("/");
    };
};

module.exports = isUserLoggedIn;