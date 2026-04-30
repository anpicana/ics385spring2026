// This code was generated with the use of Week 14 Study Guide and further refined with the help of ChatGPT


export default function isAuthenticated(req, res, next) {
  if (req.isAuthenticated?.()) return next();
  return res.redirect("/admin/login");
}