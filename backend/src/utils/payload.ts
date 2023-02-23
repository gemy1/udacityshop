import { Request } from "express";
import jwt, { Secret } from "jsonwebtoken";

const payload = (req: Request): string | jwt.JwtPayload | undefined => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET as Secret);
    return payload;
  } catch (err) {
    console.error(err);
  }
};

export default payload;
