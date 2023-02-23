"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
//@ts-ignore
const db_1 = __importDefault(require("../db"));
class OrderStore {
    async index(userId) {
        try {
            const sql = `SELECT * FROM orders WHERE user_id =$1`;
            //@ts-ignore
            const conection = await db_1.default.connect();
            const result = await conection.query(sql, [userId]);
            conection.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`can not show orders - ${error}`);
        }
    }
    async createOrder(userId, status = "active") {
        try {
            const sql = `INSERT INTO orders (status,user_id) VALUES ($1,$2) RETURNING *`;
            //@ts-ignore
            const conection = await db_1.default.connect();
            const result = await conection.query(sql, [status, userId]);
            conection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`can not create new order - ${err}`);
        }
    }
    async getActiveOrder(userId) {
        try {
            const sql = `SELECT * FROM orders WHERE user_id=$1 AND status = 'active'`;
            //@ts-ignore
            const conection = await db_1.default.connect();
            const result = await conection.query(sql, [userId]);
            conection.release();
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            return null;
        }
        catch (err) {
            throw new Error(`can not create new order - ${err}`);
        }
    }
    async addProduct(orderId, productId, quantity) {
        try {
            const sql = `INSERT INTO order_products (quantity,order_id,product_id) VALUES ($1,$2,$3) RETURNING *`;
            //@ts-ignore
            const conection = await db_1.default.connect();
            const result = await conection.query(sql, [quantity, orderId, productId]);
            conection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`can not add product to order - ${err}`);
        }
    }
    async deleteProduct(orderId, productId) {
        try {
            const sql = `DELETE FROM order_products WHERE order_id = $1 AND product_id = $2 RETURNING *`;
            //@ts-ignore
            const conection = await db_1.default.connect();
            const result = await conection.query(sql, [orderId, productId]);
            conection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`can not add product to order - ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
