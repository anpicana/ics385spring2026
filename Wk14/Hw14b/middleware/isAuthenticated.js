

// This code was generated with the use of Week 14 Study Guide 

// Apply this middleware to any route that should only be accessible when logged in
module.exports = function isauthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next(); // user is logged in — proceed
  return res.redirect("/login"); // not logged in — redirect
};