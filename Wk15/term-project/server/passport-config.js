// Configure LocalStrategy with usernameField: "email"

// This code was generated with the use of Week 14 Study Guide and further refined with the help of ChatGPT

// server/passport-config.js (ESM default export)
import { Strategy as LocalStrategy } from "passport-local";
import User from "./models/User.js";

export default function initPassport(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email.toLowerCase() });

          // PRD v3: generic error message (avoid leaking which part failed)
          if (!user) return done(null, false, { message: "Invalid credentials" });

          const ok = await user.comparePassword(password);
          if (!ok) return done(null, false, { message: "Invalid credentials" });

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
}