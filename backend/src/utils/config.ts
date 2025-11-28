import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const mongodUrl: string = process.env.MONGO_URL!;
export const serviceM8 = process.env.SERVICEM8;
export const jwt_secret = process.env.JWT_SECRET!;
