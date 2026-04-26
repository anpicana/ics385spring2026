
// This code was generated with the use of Week 14 Study Guide and 
// further refined with the help of ChatGPT

const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");

module.exports = function initializePassport(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" }, // tells passport-local to read req.body.email
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email.toLowerCase() });
          if (!user) return done(null, false);

          const match = await user.comparePassword(password);
          if (!match) return done(null, false);

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });
};