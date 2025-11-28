import { Schema, Document } from "mongoose";
import mongoose from "mongoose";

export interface Message extends Document {
  bookingId: string;
  userId: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema({
  bookingId: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<Message>("Message", MessageSchema);
