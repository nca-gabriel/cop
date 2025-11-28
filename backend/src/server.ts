import { mongodUrl, PORT } from "./utils/config";
import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authenticateJWT } from "./middleware/auth.middleware";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

import bookRoutes from "./routes/booking.route";
import messageRoute from "./routes/message.route";
import loginRoute from "./routes/auth.route";

app.use("/bookings", authenticateJWT, bookRoutes);
app.use("/messages", authenticateJWT, messageRoute);
app.use("/", loginRoute);

mongoose
  .connect(mongodUrl)
  .then(() => {
    app.listen(PORT, () => {
      console.log("server running on port: ", PORT);
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
