"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersIndexByIdController = exports.creatOrderController = exports.ordersIndexController = void 0;
const order_1 = require("../models/order");
const payload_1 = __importDefault(require("../utils/payload"));
const orderStore = new order_1.OrderStore();
const ordersIndexController = async (req, res) => {
    try {
        const user = (0, payload_1.default)(req);
        //@ts-ignore
        const orders = await orderStore.index(user.id);
        return res.status(200).json({ orders: orders });
    }
    catch (err) {
        return res.status(500).json({ error: "can not" });
    }
};
exports.ordersIndexController = ordersIndexController;
const creatOrderController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const order = await orderStore.createOrder(parseInt(id));
        return res.status(201).json({ order: order });
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
};
exports.creatOrderController = creatOrderController;
const ordersIndexByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const orders = await orderStore.index(parseInt(id));
        if (orders.length === 0) {
            throw new Error("no orders found");
        }
        return res.status(200).json({ orders: orders });
    }
    catch (err) {
        return res.status(500).json({ error: "No orders for this user" });
    }
};
exports.ordersIndexByIdController = ordersIndexByIdController;
