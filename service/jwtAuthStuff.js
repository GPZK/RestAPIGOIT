const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
require("dotenv").config();
const { User } = require("./schemas");

const SECRET = process.env.SECRET;
const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

async function generateJWTForUser(user) {
  const { id, email } = user;
  const payload = { id, email };
  const token = jwt.sign(payload, SECRET, { expiresIn: "24h" });
  return token;
}

passport.use(
  new Strategy(params, function(payload, done) {
    User.findById(payload.id)
      .then((foundUser) => {
        if (!foundUser) return done(new Error("user not found"));
        console.log(foundUser);
        return done(null, foundUser);
      })
      .catch((err) => {
        return done(err, null);
      });
  })
);

async function auth(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    console.log(req.user);
    next();
  });
}

module.exports = {
  generateJWTForUser,
  auth,
};
