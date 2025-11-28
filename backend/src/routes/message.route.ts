import { Response, Router } from "express";
import { serviceM8 } from "../utils/config";
import axios from "axios";
import { AuthRequest } from "../middleware/auth.middleware";
import Message from "../models/message.schema";

const router = Router();

router.get("/:bookingId", async (req: AuthRequest, res: Response) => {
  const { bookingId } = req.params;
  const messages = await Message.find({ bookingId });
  res.json(messages);
});

router.post("/:bookingId", async (req: AuthRequest, res: Response) => {
  const { bookingId } = req.params;
  const { content } = req.body;

  if (!content)
    return res.status(400).json({ message: "Message content required" });

  const message = await Message.create({
    bookingId,
    userId: req.user.userId,
    content,
  });

  res.json(message);
});

export default router;
