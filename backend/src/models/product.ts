// @ts-ignore
import client from "../db";
import sqlUpdate from "../utils/sql-update";

export type Product = {
  id?: number | string;
  name: string;
  description: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const sql = `SELECT * FROM PRODUCTS`;
      // @ts-ignore
      const conection = await client.connect();
      const products = await conection.query(sql);
      conection.release();
      return products.rows;
    } catch (err) {
      throw new Error(`could not connect to Products - ${err}`);
    }
  }
  async show(id: string): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";
      // @ts-ignore
      const conection = await client.connect();
      const product = await conection.query(sql, [id]);
      conection.release();
      return product.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const sql = `INSERT INTO products (name,description,price,category) VALUES ($1,$2,$3,$4) RETURNING *`;
      // @ts-ignore
      const conection = await client.connect();
      const product = await conection.query(sql, [
        p.name,
        p.description,
        p.price,
        p.category,
      ]);
      conection.release();
      return product.rows[0];
    } catch (err) {
      throw new Error(`could not create Product - ${err}`);
    }
  }
  async delete(id: string): Promise<Product> {
    try {
      // @ts-ignore
      const conection = await client.connect();
      const sql = "DELETE FROM products WHERE id=($1) RETURNING *";
      const result = await conection.query(sql, [id]);
      conection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`could not delete Product - ${err}`);
    }
  }
  async update(id: string, p: Product): Promise<Product> {
    try {
      const sql = sqlUpdate(id, p);
      // @ts-ignore
      const conection = await client.connect();
      const result = await conection.query(sql);
      conection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`could not update Product - ${err}`);
    }
  }

  async showByCategory(category: string) {
    try {
      const sql = `SELECT * FROM products WHERE category=$1`;
      // @ts-ignore
      const conection = await client.connect();
      const products = await conection.query(sql, [category]);
      conection.release();
      return products.rows;
    } catch (err) {
      throw new Error(`could not connect to Products - ${err}`);
    }
  }
}
