const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: "User not found" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return done(null, false, { message: "Invalid credentials" });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);
passport.serializeUser((user, done) => {
  console.log(user, "seriallizer");
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log(user, "deseriallizer");
    done(null, user);
  } catch (error) {
    done(error);
  }
});
