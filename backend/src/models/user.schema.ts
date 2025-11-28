import { Schema, Document } from "mongoose";
import mongoose from "mongoose";

export interface User extends Document {
  email: string;
  phone: string;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model<User>("User", UserSchema);
