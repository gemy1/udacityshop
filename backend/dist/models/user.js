"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
// @ts-ignore
const db_1 = __importDefault(require("../db"));
class UserStore {
    async index() {
        try {
            const sql = `SELECT * FROM users`;
            // @ts-ignore
            const conection = await db_1.default.connect();
            const result = await conection.query(sql);
            conection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`cannot get users - ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = `SELECT * FROM users WHERE id =$1`;
            // @ts-ignore
            const conection = await db_1.default.connect();
            const result = await conection.query(sql, [id]);
            conection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`cannot get users - ${err}`);
        }
    }
    async create(u) {
        try {
            const sql = `INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;
            // @ts-ignore
            const conection = await db_1.default.connect();
            const result = await conection.query(sql, [
                u.firstname,
                u.lastname,
                u.email,
                u.password,
            ]);
            conection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`cannot create user - ${err}`);
        }
    }
    async findUserByEmail(email) {
        try {
            const sql = `SELECT * FROM users WHERE email =$1`;
            // @ts-ignore
            const conection = await db_1.default.connect();
            const result = await conection.query(sql, [email]);
            conection.release();
            if (result.rows.length) {
                return result.rows[0];
            }
            return null;
        }
        catch (err) {
            throw new Error(`cannot find user by email - ${err}`);
        }
    }
}
exports.UserStore = UserStore;
