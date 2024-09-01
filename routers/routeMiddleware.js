function isAuthenticated(req, res,next) {
    if (req.isAuthenticated()) {
        next();
    }
    else res.redirect("/", [401]);
}

function isMember(req, res, next) {
    console.log(req.user);
    if (req.user.member)
    { 
        next();
    }
    else {
        res.redirect("/member", [401]);
    }
    
}

module.exports = {
    isAuthenticated,
    isMember
}