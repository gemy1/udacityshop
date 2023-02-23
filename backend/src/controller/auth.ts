import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
import { User, UserStore } from "../models/user";

dotenv.config();

const userStore = new UserStore();

export const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;
  //check if all fields are valid
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = await userStore.findUserByEmail(email);
  if (!user) {
    return res
      .status(404)
      .json({ error: { msg: "Invalid Email Or Password" } });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(404)
      .json({ error: { msg: "Invalid Email Or Password" } });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    },
    process.env.JWT_SECRET as Secret
  );

  return res.status(200).json({ massage: "login success", token: token });
};

export const registerController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { firstname, lastname, email, password } = req.body;
  //check if all fields are valid
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await userStore.create({
    firstname,
    lastname,
    email,
    password: hashPassword,
  });

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    },
    process.env.JWT_SECRET as Secret
  );

  return res.status(200).json({ massage: "register success", token: token });
};
