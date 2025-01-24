import mysql from "mysql2";
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
