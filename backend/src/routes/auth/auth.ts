import { Router } from "express";
import { body, CustomValidator } from "express-validator";
import { registerController, loginController } from "../../controller/auth";
import { User, UserStore } from "../../models/user";

const authRouter = Router();

const isValidUser: CustomValidator = async (value) => {
  const userStore = new UserStore();
  const user = await userStore.findUserByEmail(value);
  if (user) {
    return Promise.reject("E-mail already in use");
  }
};

authRouter.post(
  "/login",
  [
    body("email", "please enter a valid email").normalizeEmail().isEmail(),
    body("password", "you must enter the password").notEmpty(),
  ],
  loginController
);
authRouter.post(
  "/register",
  [
    body("email", "please enter a valid email")
      .normalizeEmail()
      .isEmail()
      .custom(isValidUser),
    body("password", "password must be at least 5 characters").isLength({
      min: 5,
    }),
    body("firstname", "firstname is missing").notEmpty(),
    body("lastname", "lastname is missing").notEmpty(),
  ],
  registerController
);

export default authRouter;
