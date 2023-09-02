const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    if (
      token == null ||
      token == undefined ||
      token == "undefined" ||
      token == "null" ||
      token == ""
    ) {
      return res
        .status(401)
        .json({ error: { message: "No Authorization token was found" } });
    }
    const verifyTok = jwt.verify(
      token,
      process.env.accessTokenSecret,
      (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .json({ error: { message: "User is not authorized" } });
        }
        console.log('decoded',decoded)
        var currentDate = parseInt(+new Date() / 1000);
        if (currentDate > decoded.exp) {
          return res
            .status(401)
            .json({ error: { message: "Session is expired" } });
        }
        if (!decoded.user_id) {
          return res
            .status(401)
            .json({ error: { message: "Invalid JWT token" } });
        }
        req.authUser = decoded;

        next();
      }
    );
  } else {
    return res
      .status(401)
      .json({ error: { message: "No Authorization token was found" } });
  }
};
module.exports = validateToken;
