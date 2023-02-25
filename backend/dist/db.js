"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./utils/config"));
const pg_1 = require("pg");
let client;
if (config_1.default.ENV === "test") {
    client = new pg_1.Pool({
        host: config_1.default.POSTGRES_HOST,
        database: config_1.default.POSTGRES_DB_TEST,
        user: config_1.default.POSTGRES_USER,
        password: config_1.default.POSTGRES_PASSWORD,
    });
}
if (config_1.default.ENV === "dev") {
    client = new pg_1.Pool({
        host: config_1.default.POSTGRES_HOST,
        database: config_1.default.POSTGRES_DB,
        user: config_1.default.POSTGRES_USER,
        password: config_1.default.POSTGRES_PASSWORD,
    });
}
exports.default = client;
