import passport from "passport";
import User from "../models/user.js"
import bcrypt from "bcrypt"
import { Strategy as LocalStrategy} from 'passport-local'



passport.use('local-signin',
    new LocalStrategy((username, password, done) => {
      console.log(username);
      User.findOne({ user: username }, (err, user) => {
        console.log(user);
        console.log("strategy");
        
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.user,
      };
      cb(err, userInformation);
    });
  });


export default passport