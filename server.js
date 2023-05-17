import app, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import routerAuth from "./routes/userRoutes.js";
const server = app();

// connect to database
connectDB();

server.use(morgan("dev"));
server.use(json());
server.use(
  cors({
    origin: "*",
  })
);

// routes
server.use("/api/v1/auth", routerAuth);
var PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
