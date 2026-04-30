// This code is from the Week15 HW15A study guide

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
   clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, Profiler, done) => {
    try {
      let user = await User.findOne({ googleId: Profiler.id });
      if (!user) {
        user = await User.create({
          googleId: Profiler.id,
          email: Profiler.emails[0].value.toLowerCase(),
          displayName: Profiler.displayName
        });
      }
      done(null, user);
    } catch (err) { done(err);}
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try { done(null, await User.findById(id));}
  catch (e)
   { done(e); }
});
