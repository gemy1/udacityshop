"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersController = exports.showUserController = exports.indexUserController = void 0;
const user_1 = require("../models/user");
const order_1 = require("../models/order");
const userStore = new user_1.UserStore();
const order = new order_1.OrderStore();
const indexUserController = async (req, res) => {
    try {
        const users = await userStore.index();
        return res.status(200).json({ users: users });
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
};
exports.indexUserController = indexUserController;
const showUserController = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userStore.show(parseInt(id));
        if (!user)
            return res.status(404).json({ message: "user not found" });
        return res.status(200).json({ user: user });
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
};
exports.showUserController = showUserController;
const getOrdersController = async (req, res) => {
    const { id } = req.params;
    try {
        const o = await order.getActiveOrder(parseInt(id));
        if (!o)
            return res.status(404).json({ message: "No active order for this user" });
        return res.status(200).json({ user: o });
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
};
exports.getOrdersController = getOrdersController;
