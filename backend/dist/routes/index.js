"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = __importDefault(require("./product/product"));
const auth_1 = __importDefault(require("./auth/auth"));
const order_1 = __importDefault(require("./order/order"));
const user_1 = __importDefault(require("./user/user"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.status(200).send(`this is api`);
});
router.use(product_1.default);
router.use(auth_1.default);
router.use(order_1.default);
router.use(user_1.default);
exports.default = router;
