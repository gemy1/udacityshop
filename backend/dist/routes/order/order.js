"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("../../controller/order");
const isAuth_1 = __importDefault(require("../../middleware/isAuth"));
const orderRouter = (0, express_1.Router)();
// orders index
orderRouter.get("/orders", isAuth_1.default, order_1.ordersIndexController);
// orders index
orderRouter.get("/orders/:id", isAuth_1.default, order_1.ordersIndexByIdController);
// create order
orderRouter.post("/order/user/:id", isAuth_1.default, order_1.creatOrderController);
exports.default = orderRouter;
