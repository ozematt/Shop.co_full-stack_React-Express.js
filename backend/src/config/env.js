import { config } from "dotenv";

config({ path: ".env" });

export const {
  PORT,
  JWT_SECRET,
  DB_HOST,
  DB_USER,
  DB_PORT,
  DB_PASSWORD,
  DB_NAME,
} = process.env;
