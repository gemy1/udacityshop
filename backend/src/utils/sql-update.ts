import { Product } from "../models/product";
const sqlUpdate = (id: string, p: Product): string => {
  let sql: string = `UPDATE products SET `;
  let numOfArgs: number = 0;
  for (const i in p) {
    //@ts-ignore
    if (p[i]) {
      numOfArgs++;
      if (numOfArgs > 1) {
        //@ts-ignore
        sql += ` ,${i} = '${p[i]}'`;
      } else {
        //@ts-ignore
        sql += ` ${i} = '${p[i]}'`;
      }
    }
  }
  sql += ` WHERE id=${id} RETURNING *`;

  return sql;
};

export default sqlUpdate;
