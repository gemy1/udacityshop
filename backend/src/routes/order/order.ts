import { Router } from "express";
import {
  ordersIndexController,
  creatOrderController,
  ordersIndexByIdController,
} from "../../controller/order";
import isAuth from "../../middleware/isAuth";

const orderRouter = Router();

// orders index
orderRouter.get("/orders", isAuth, ordersIndexController);

// orders index
orderRouter.get("/orders/:id", isAuth, ordersIndexByIdController);

// create order
orderRouter.post("/order/user/:id", isAuth, creatOrderController);

export default orderRouter;
