"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../../controller/auth");
const user_1 = require("../../models/user");
const authRouter = (0, express_1.Router)();
const isValidUser = async (value) => {
    const userStore = new user_1.UserStore();
    const user = await userStore.findUserByEmail(value);
    if (user) {
        return Promise.reject("E-mail already in use");
    }
};
authRouter.post("/login", [
    (0, express_validator_1.body)("email", "please enter a valid email").normalizeEmail().isEmail(),
    (0, express_validator_1.body)("password", "you must enter the password").notEmpty(),
], auth_1.loginController);
authRouter.post("/register", [
    (0, express_validator_1.body)("email", "please enter a valid email")
        .normalizeEmail()
        .isEmail()
        .custom(isValidUser),
    (0, express_validator_1.body)("password", "password must be at least 5 characters").isLength({
        min: 5,
    }),
    (0, express_validator_1.body)("firstname", "firstname is missing").notEmpty(),
    (0, express_validator_1.body)("lastname", "lastname is missing").notEmpty(),
], auth_1.registerController);
exports.default = authRouter;
