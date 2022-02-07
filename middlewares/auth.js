const jwt = require("jsonwebtoken");

const validate = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken) {
    return res.status(400).json({ error: "User Not Authenticated" });
  }
  try {
    const validToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    if (validToken) {
      req.authentiacted = true;
      return next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  validate,
};
