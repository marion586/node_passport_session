//Import Express
const express = require("express");
const app = express();
//Import the main Passport and Express-Session library
const passport = require("passport");
const session = require("express-session");
//Import the secondary "Strategy" library
const LocalStrategy = require("passport-local").Strategy;
// In this example we will use the "local" strategy
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session);
passport.use(new LocalStrategy(authUser));

const authUser = (user, password, done) => {
  let authenticated_user = { id: 123, name: "Kyle" };

  return done(null, authenticated_user);
};

passport.serializeUser((userObj, done) => {
  done(null, userObj);
});

passport.deserializeUser((userObj, done) => {
  done(null, userObj);
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

app.get("/dashboard", checkAuthenticated, (req, res) => {
  res.json({ name: req.user.name });
});

checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }
  next();
};

app.get("/login", checkLoggedIn, (req, res) => {
  res.json({ login: "marion" });
});

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
  console.log(`-------> User Logged out`);
});