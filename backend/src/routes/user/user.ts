import { Router } from "express";
import {
  indexUserController,
  showUserController,
  getOrdersController,
} from "../../controller/user";
import isAuth from "../../middleware/isAuth";

const userRouter = Router();

userRouter.get("/users", isAuth, indexUserController);
userRouter.get("/user/:id", isAuth, showUserController);
userRouter.get("/user/:id/orders", isAuth, getOrdersController);

export default userRouter;
