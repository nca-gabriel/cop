import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../utils/config";
import User from "../models/user.schema";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { email, phone } = req.body;
  if (!email || !phone)
    return res.status(400).json({ message: "Email + phone required" });

  let user = await User.findOne({ email, phone });

  if (!user) {
    user = new User({ email, phone });
    await user.save();
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id, email: user.email }, jwt_secret, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 3600000, // 1 hour
  });

  res.json({ user: { email: user.email, phone: user.phone } });
});

router.post("/logout", async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

export default router;
