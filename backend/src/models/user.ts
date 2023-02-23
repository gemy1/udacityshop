// @ts-ignore
import client from "../db";

export type User = {
  id?: string | number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const sql = `SELECT * FROM users`;
      // @ts-ignore
      const conection = await client.connect();
      const result = await conection.query(sql);
      conection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get users - ${err}`);
    }
  }

  async show(id: number): Promise<User[]> {
    try {
      const sql = `SELECT * FROM users WHERE id =$1`;
      // @ts-ignore
      const conection = await client.connect();
      const result = await conection.query(sql, [id]);
      conection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot get users - ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const sql = `INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;
      // @ts-ignore
      const conection = await client.connect();
      const result = await conection.query(sql, [
        u.firstname,
        u.lastname,
        u.email,
        u.password,
      ]);
      conection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot create user - ${err}`);
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const sql = `SELECT * FROM users WHERE email =$1`;
      // @ts-ignore
      const conection = await client.connect();
      const result = await conection.query(sql, [email]);
      conection.release();
      if (result.rows.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(`cannot find user by email - ${err}`);
    }
  }
}
