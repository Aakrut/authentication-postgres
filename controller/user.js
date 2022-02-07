const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await User.findOne({ where: { email: email } });

    if (!data) res.status(400).json({ error: "User does not Exists" });

    const dbPassword = data.password;
    bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {
        res
          .status(400)
          .json({ error: "Wrong Username and Password Combination!" });
      } else {
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, {
          expiresIn: "15m",
        });

        res.cookie("access-token", token, {
          maxAge: 60 * 60 * 24 * 30,
          httpOnly: true,
        });

        res.status(201).json("Logged In");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const signUp = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    bcrypt.genSalt(8, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        const data = User.create({
          username: username,
          email: email,
          password: hash,
        });

        res.json({ data });
      });
    });
    const token = await jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15m",
    });

    res.cookie("access-token", token, {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
    });

  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  try {
   res.status(202).clearCookie("access-token").send("cookie cleared");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signUp,
  login,
  logout,
};
