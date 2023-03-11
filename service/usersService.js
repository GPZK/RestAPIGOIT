const { User } = require("./schemas");
const bcrypt = require("bcrypt");
const { generateJWTForUser } = require("./jwtAuthStuff");

async function registerNewUser(req, res) {
  const { email, password } = req.body;
  try {
    const newUser = new User({ password, email });
    await User.create(newUser);
  } catch (err) {
    if (err.keyPattern["email"] === 1)
      return res
        .status(409)
        .json({ message: `user with email ${email} already exists` });
    else return res.status(400).json(err);
  }
  return res.status(201).json({
    user: {
      email: email,
      subscription: "starter",
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser)
    return res.status(401).json({ message: "Email or password is wrong" });
  const passwordCheck = await bcrypt.compare(password, foundUser.password);
  if (!passwordCheck)
    return res.status(401).json({ message: "Email or password is wrong" });
  const token = await generateJWTForUser(foundUser);
  return res.status(200).json({
    token: token,
    user: {
      email: email,
      subscription: foundUser.subscription,
    },
  });
}

async function logout(req, res) {
  return res
    .status(200)
    .json({ message: `${req.user.email}, удоли токен пожалуйсто` });
}
async function showCurrent(req, res) {
  const user = { email: req.user.email, subscribtion: req.user.subscribtion };
  return res.status(200).json(user);
}

module.exports = {
  registerNewUser,
  loginUser,
  logout,
  showCurrent,
};
