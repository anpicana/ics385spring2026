// Routes for /admin/login (GET + POST) and /admin/logout (GET), with error handling

// This code was generated with the use of Week 14 Study Guide and further refined with the help of ChatGPT

import { body, validationResult } from "express-validator";

import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/login", (req, res) => {
  if (req.isAuthenticated?.()) return res.redirect("/admin/dashboard");
  const error = req.query.error ? "Invalid credentials. Please try again." : null;

  res.render("admin/login", {
    error,
    propertyName: "Big Island Honeymoon Getaway"
  });
});

// Week 14 code: 
//router.post(
//  "/login",
//  passport.authenticate("local", {
//    successRedirect: "/admin/dashboard",
//    failureRedirect: "/admin/login?error=1"
//  })
// );

// Week 15 code to validate + sanitize form inputs on eveyr POST route that accepts user input
router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }).trim()
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.redirect("/admin/login?error=1");
    }

    return passport.authenticate("local", {
      successRedirect: "/admin/dashboard",
      failureRedirect: "/admin/login?error=1"
    })(req, res, next);
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/admin/login");
  });
});

export default router;