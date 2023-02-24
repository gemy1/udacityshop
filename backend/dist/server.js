"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const port = process.env.PORT || 4000;
const app = (0, express_1.default)();
const address = "127.0.0.1:3000";
// Middlewares
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
//Routes
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.status(200).send("Welcome to ouer api");
});
// Handle Any Other Routes
app.use((req, res) => {
    res.status(404).send("Page Not Found - Error (404)");
});
app.listen(port, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
