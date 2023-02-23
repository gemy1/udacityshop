import { Response, Request, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET as Secret);
  } catch (err) {
    res.status(401);
    res.json({
      error: "Access denied, invalid token , token must be provided",
    });
    return;
  }
  next();
};

export default isAuth;
