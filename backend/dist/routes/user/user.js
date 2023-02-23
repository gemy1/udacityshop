"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../../controller/user");
const isAuth_1 = __importDefault(require("../../middleware/isAuth"));
const userRouter = (0, express_1.Router)();
userRouter.get("/users", isAuth_1.default, user_1.indexUserController);
userRouter.get("/user/:id", isAuth_1.default, user_1.showUserController);
userRouter.get("/user/:id/orders", isAuth_1.default, user_1.getOrdersController);
exports.default = userRouter;
