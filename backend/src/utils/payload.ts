import { Request } from "express";
import jwt, { Secret } from "jsonwebtoken";
import config from "./config";

const payload = (req: Request): string | jwt.JwtPayload | undefined => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    const payload = jwt.verify(token, config.JWT_SECRET as Secret);
    return payload;
  } catch (err) {
    console.error(err);
  }
};

export default payload;
