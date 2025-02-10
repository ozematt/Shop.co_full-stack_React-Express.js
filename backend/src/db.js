import mysql from "mysql2";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./config/env.js";

const pool = mysql.createPool({
  host: DB_HOST, // Service name from docker-compose.yml "127.0.0.1"
  user: DB_USER, // Database user
  password: DB_PASSWORD, // User Password
  database: DB_NAME, // Database name
  port: DB_PORT, // The port on which MySQL is running in the container
});

const poolPromise = pool.promise();

const connectToDatabase = async () => {
  let retries = 2;

  while (retries) {
    try {
      await poolPromise.getConnection();

      console.log("MySQL Connection Success 👍 👍");

      break; // After a successful connection, we exit the loop
    } catch (error) {
      console.log("Database Connection Error, retrying...");
      console.log(error);
      retries -= 1;
      if (retries === 0) {
        throw new Error("MySQL Connection failed after several attempts.");
      }
      await new Promise((res) => setTimeout(res, 5000)); // Wait 5 seconds before trying again
    }
  }
};

export { connectToDatabase, poolPromise };
