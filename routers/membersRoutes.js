const {Router} = require("express");
const controllers = require("../controllers/controllers");
const indexRouter = Router();
const passport = require("../config/passport");
const isAuthenticated = require("../routers/routeMiddleware").isAuthenticated;
const isMember = require("../routers/routeMiddleware").isMember;



indexRouter.get("/", controllers.index);
indexRouter.get("/signup", controllers.signup);
indexRouter.post("/signup", controllers.signupPost);

indexRouter.post("/login", passport.authenticate("local", {
    successRedirect: "/messages",
    failureRedirect: "/"
})
);

indexRouter.get("/logout", controllers.logout);

indexRouter.get("/messages", isAuthenticated, controllers.messagesGet);
indexRouter.post("/messages", controllers.messagesPost);
indexRouter.get("/membersonly", isAuthenticated, isMember, controllers.membersOnly);
indexRouter.post("/membersonly", isAuthenticated, isMember, controllers.membersOnlyPost);
indexRouter.get("/member", isAuthenticated, controllers.members);
indexRouter.post("/member", isAuthenticated, controllers.membersPost);
indexRouter.get("/admin", isAuthenticated, isMember, controllers.admin);
indexRouter.post("/admin", isAuthenticated, isMember, controllers.adminPost);
indexRouter.post("/delete/:id", isAuthenticated, isMember, controllers.deletePost);



module.exports = indexRouter;