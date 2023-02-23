"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlUpdate = (id, p) => {
    let sql = `UPDATE products SET `;
    let numOfArgs = 0;
    for (const i in p) {
        //@ts-ignore
        if (p[i]) {
            numOfArgs++;
            if (numOfArgs > 1) {
                //@ts-ignore
                sql += ` ,${i} = '${p[i]}'`;
            }
            else {
                //@ts-ignore
                sql += ` ${i} = '${p[i]}'`;
            }
        }
    }
    sql += ` WHERE id=${id} RETURNING *`;
    return sql;
};
exports.default = sqlUpdate;
