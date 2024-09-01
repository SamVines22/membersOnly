const express = require("express");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 3000;
const path = require("node:path");
const membersRouter = require("./routers/membersRoutes");
const passport = require("./config/passport");



app.set("views", path.join(__dirname,"./views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(session({secret:"cats", resave:"false", saveUnititialized: "false"}));
app.use(passport.initialize());
app.use(passport.session());



app.use((req,res,next)=> {
    res.locals.currentUser = req.user;
    next();
})
app.use("/", membersRouter);



app.listen(port, ()=> {console.log(`port open on ${port}`)});