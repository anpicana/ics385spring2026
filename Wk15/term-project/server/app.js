// server/app.js (Week 14: Week 13 + Auth)

import "dotenv/config";

import express from "express";
import mongoose from "mongoose";

import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";

import initPassport from "./passport-config.js";

// your existing Week 13 routes
import propertyRoutes from "./routes/properties.js";
import chartRoutes from "./routes/chartRoutes.js";

// Week 14 auth routes (you created these)
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";

// Week 15 routes
import activityRoutes from "./routes/activities.js";
import weatherRoutes from "./routes/weather.js";

const app = express();

// middleware to read form data + json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS views (needed for /admin/login and /admin/dashboard)
app.set("view engine", "ejs");

// connect to Mongo
await mongoose.connect(process.env.MONGO_URI);
console.log("Connected to MongoDB");

// sessions (MUST come before passport middleware)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { secure: false }
  })
);

// passport
initPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Week 15 routes
app.use("/api/activities", activityRoutes);
app.use("/api/weather", weatherRoutes);

// Week 14 admin routes
app.use("/admin", authRoutes);
app.use("/admin", adminRoutes);

// Week 13 routes
app.use("/api", chartRoutes);
app.use("/properties", propertyRoutes);
app.use("/api/properties", propertyRoutes);

// start server
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is running ✅ Try /admin/login or /admin/dashboard");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});