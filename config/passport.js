const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//const session = require("express-session");
const pool = require("../db/pool");
const bcryptjs = require("bcryptjs");

passport.use(
    new LocalStrategy(async (username, password, done)=> {
        try {
            const {rows} = await pool.query("SELECT * FROM users WHERE username = $1",[username]);
            const user = rows[0];
            if (!user) {
                return done(null,false, {message: "incorrect username"});
            }
            const match = await bcryptjs.compare(password, user.password);
            if (!match) {
                return done(null, false, {message: "incorrect password"});
            }
            return done(null,user);
        }
        catch(err) {
                return done(null,err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      const user = rows[0];
  
      done(null, user);
    } catch(err) {
      done(err);
    }
  });



  module.exports = passport;