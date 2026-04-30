// This code is from the Week15 HW15A study guide and refined with the help of ChatGPT

const router = require('express').Router();
const passport = require('passport');

router.get('/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    prompt: 'consent' }) // Generated with use of ChatGPT -- forces the consent screen to appear
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/'}),
  (req, res) => res.redirect('/profile')
);

module.exports = router;