// This code is from the Week15 HW15A study guide

module.exports = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.redirect('/');
};