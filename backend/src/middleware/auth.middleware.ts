import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../utils/config";

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token; // read JWT from HTTP-only cookie
  if (!token) return res.status(401).json({ message: "Missing token" });

  try {
    const decoded = jwt.verify(token, jwt_secret);

    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
