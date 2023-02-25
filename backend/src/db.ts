import config from "./utils/config";
import { Pool } from "pg";

let client;

if (config.ENV === "test") {
  client = new Pool({
    host: config.POSTGRES_HOST,
    database: config.POSTGRES_DB_TEST,
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
  });
}

if (config.ENV === "dev") {
  client = new Pool({
    host: config.POSTGRES_HOST,
    database: config.POSTGRES_DB,
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
  });
}

export default client;
