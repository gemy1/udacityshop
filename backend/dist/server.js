"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const address = "127.0.0.1:3000";
// Middlewares
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
//Routes
app.use("/api", routes_1.default);
// Handle Any Other Routes
app.use((req, res) => {
    res.status(404).send("Page Not Found - Error (404)");
});
app.listen(4000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
