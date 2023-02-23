"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = exports.loginController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_validator_1 = require("express-validator");
const user_1 = require("../models/user");
dotenv_1.default.config();
const userStore = new user_1.UserStore();
const loginController = async (req, res) => {
    const { email, password } = req.body;
    //check if all fields are valid
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const user = await userStore.findUserByEmail(email);
    if (!user) {
        return res
            .status(404)
            .json({ error: { msg: "Invalid Email Or Password" } });
    }
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        return res
            .status(404)
            .json({ error: { msg: "Invalid Email Or Password" } });
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
    }, process.env.JWT_SECRET);
    return res.status(200).json({ massage: "login success", token: token });
};
exports.loginController = loginController;
const registerController = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    //check if all fields are valid
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const hashPassword = await bcrypt_1.default.hash(password, 10);
    const user = await userStore.create({
        firstname,
        lastname,
        email,
        password: hashPassword,
    });
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
    }, process.env.JWT_SECRET);
    return res.status(200).json({ massage: "register success", token: token });
};
exports.registerController = registerController;
