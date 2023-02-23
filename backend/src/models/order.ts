//@ts-ignore
import client from "../db";

export type Order = {
  id?: number;
  status: string;
  user_id?: string;
};

export type OrderProduct = {
  id?: number;
  quantity: number;
  order_id: string;
  product_id: string;
};

export class OrderStore {
  async index(userId: number) {
    try {
      const sql = `SELECT * FROM orders WHERE user_id =$1`;
      //@ts-ignore
      const conection = await client.connect();
      const result = await conection.query(sql, [userId]);
      conection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`can not show orders - ${error}`);
    }
  }

  async createOrder(userId: number, status: string = "active"): Promise<Order> {
    try {
      const sql = `INSERT INTO orders (status,user_id) VALUES ($1,$2) RETURNING *`;
      //@ts-ignore
      const conection = await client.connect();
      const result = await conection.query(sql, [status, userId]);
      conection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`can not create new order - ${err}`);
    }
  }

  async getActiveOrder(userId: number): Promise<Order | null> {
    try {
      const sql = `SELECT * FROM orders WHERE user_id=$1 AND status = 'active'`;
      //@ts-ignore
      const conection = await client.connect();
      const result = await conection.query(sql, [userId]);
      conection.release();
      if (result.rows.length > 0) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(`can not create new order - ${err}`);
    }
  }
  async addProduct(
    orderId: string,
    productId: string,
    quantity: number
  ): Promise<OrderProduct> {
    try {
      const sql = `INSERT INTO order_products (quantity,order_id,product_id) VALUES ($1,$2,$3) RETURNING *`;
      //@ts-ignore
      const conection = await client.connect();
      const result = await conection.query(sql, [quantity, orderId, productId]);
      conection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`can not add product to order - ${err}`);
    }
  }

  async deleteProduct(
    orderId: string,
    productId: string
  ): Promise<OrderProduct> {
    try {
      const sql = `DELETE FROM order_products WHERE order_id = $1 AND product_id = $2 RETURNING *`;
      //@ts-ignore
      const conection = await client.connect();
      const result = await conection.query(sql, [orderId, productId]);
      conection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`can not add product to order - ${err}`);
    }
  }
}
