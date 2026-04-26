
// This code was generated with the use of Week 14 Study Guide and 
// further refined with the help of ChatGPT

require("dotenv").config({ path: __dirname + "/.env" });
console.log("MONGODB_URI loaded?", !!process.env.MONGODB_URI);
console.log("SESSION_SECRET length:", process.env.SESSION_SECRET ? process.env.SESSION_SECRET.length : 0);

const express = require("express");
const mongoose = require("mongoose");

const session = require("express-session");
const MongoStore = require("connect-mongo").default;

const passport = require("passport");
const initializePassport = require("./passport-config");

const User = require("./models/User");
const isAuthenticated = require("./middleware/isAuthenticated");

const app = express();

// Parse from bodies
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error: ", err));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    //store: MongoStore.createKrupteinAdapter({ mongoUrl: process.env.MONGODB_URI }),
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      crypto: {
        secret: process.env.SESSION_SECRET, // IMPORTANT: pass secret here
      },
     }),
    cookie: { secure: false }, // secure: true only with HTTPS
  })
);

//Passport
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes

// GET /register
app.get("/register", (req, res) => {
  res.send(`
    <h2>Register</h2>
    <form method="POST" action="/register">
      <label>Email:</label><br>
      <input name="email" type="email" required /><br/><br/>
      <label>Password:</label><br>
      <input name="password" type="password" required /><br/><br/>
      <button type="submit">Create Account</button>
      </form>
      <p>Already have an account? <a href="/login">Login here</a></p>
  `);
});

// POST /register
app.post("/register", async (req, res) => {
  try{
    const email = (req.body.email || "").toLowerCase();
    const password = req.body.password || "";

    const existing = await User.findOne({ email });
    if (existing) {
      return res.send(`
        <p>User already exists with that email.</p>
        <a href="/regite">Back to Register</a>
      `);
    }

    const user = new User({ email, password, role: "user" });
    await user.save(); // this triggers the bcypt pre-save hook to hash the password
    return res.redirect("/login");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error during registration.");
  }
});

//GET /login
app.get("/login", (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/profile");

  res.send(`
    <h2>Login</h2>
    <form method="POST" action="/login">
      <label>Email: </label><br/>
      <input name="email" type="email" required /><br/><br/>
      <label>Password: </label><br/>
      <input name="password" type="password" required /><br/><br/>
      <button type="submit">Login</button>
    </form>
    <p>No account? <a href="/register">Register</a></p>
  `);
});

// POST /login
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  })
);

// GET /profile
app.get("/profile", isAuthenticated, (req, res) => {
  res.send(`
    <h2>Profile (Protected)</h2>
    <p><strong>Email: </strong> ${req.user.email}</p>
    <p><strong>Role:  </strong> ${req.user.role}</p>
    <p><a href="/logout">Logout</a></p>
  `);
});

// GET /logout
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/login");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));