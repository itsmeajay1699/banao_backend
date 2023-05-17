import express from "express";
const routerAuth = express.Router();

import {
  registerController,
  loginController,
} from "../controllers/authController.js";
import requireSignIn from "../middlewares/authMiddleware.js";
routerAuth
  .post("/register", registerController)
  .post("/login", loginController)
  .get("/test", requireSignIn, (req, res) => {
    res.json({ ok: true });
  });

export default routerAuth;
