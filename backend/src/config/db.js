import mysql from "mysql2";
import { createTable } from "../utils/helperFunction.js";
import { orderItemTable, ordersTable, usersTable } from "./query.js";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST, // Nazwa usługi z docker-compose.yml "127.0.0.1"
  user: process.env.DB_USER, // Użytkownik bazy danych
  password: process.env.DB_PASSWORD, // Hasło użytkownika
  database: process.env.DB_NAME, // Nazwa bazy danych
  port: process.env.DB_PORT, // Port, na którym działa MySQL w kontenerze
});

const poolPromise = pool.promise();

const connectToDatabase = async () => {
  let retries = 5;
  while (retries) {
    try {
      await poolPromise.getConnection();

      console.log("MySQL Connection Success 👍 👍");

      await createTable(usersTable);
      await createTable(ordersTable);
      await createTable(orderItemTable);

      break; // Po udanym połączeniu, wychodzimy z pętli
    } catch (error) {
      console.log("Database Connection Error, retrying...");
      console.log(error);
      retries -= 1;
      if (retries === 0) {
        throw new Error("MySQL Connection failed after several attempts.");
      }
      await new Promise((res) => setTimeout(res, 5000)); // Czekaj 5 sekund przed kolejną próbą
    }
  }
};

export { connectToDatabase, poolPromise };
