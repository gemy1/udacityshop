import { Router, Request, Response } from "express";
import productRouter from "./product/product";
import authRouter from "./auth/auth";
import orderRouter from "./order/order";
import userRouter from "./user/user";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send(`this is api`);
});

router.use(productRouter);
router.use(authRouter);
router.use(orderRouter);
router.use(userRouter);

export default router;
