import { verify } from "jsonwebtoken";
const requireSignIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = verify(token, "ajayroy03377");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(302).json({ error: "Invalid token" });
  }
};

export default requireSignIn;
