const { getUser } = require("../services/auth");
const jwt = require("jsonwebtoken");

async function restrictToLoggedinUserOnly(req, res, next) {
  const token = req.cookies.authToken; // Extract token from cookie

  if (!token) {
    return res.redirect("/login");
  }

  const user = getUser(token);

  if (!user) {
    return res.redirect("/login");
  }

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const token = req.cookies.authToken; // Extract token from cookie
  console.log(`auth token : ${token}`);

  if (!token) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const user = getUser(token);

  if (!user) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.user = user;
  next();
}

async function authenticateJWT(req, res, next) {
    const token = req.cookies.authToken || req.headers["authorization"]?.split(" ")[1]; // Check for token in cookies first
  
    if (!token) {
      return res.status(401).json({ error: "Authorization token required" });
    }
  
    jwt.verify(token, "Samiksha$123", (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" }); // Send more descriptive error
      }
  
      req.user = user;
      next();
    });
  }
  

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
  authenticateJWT,
};
