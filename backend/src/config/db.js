import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST, // Nazwa usługi z docker-compose.yml
  user: process.env.DB_USER, // Użytkownik bazy danych
  password: process.env.DB_PASSWORD, // Hasło użytkownika
  database: process.env.DB_NAME, // Nazwa bazy danych
  port: process.env.DB_PORT, // Port, na którym działa MySQL w kontenerze
});

const poolPromise = pool.promise();

const connectToDatabase = async () => {
  try {
    await poolPromise.getConnection();
    console.log("MySQL Connection Success 👍 👍");
  } catch (error) {
    console.log("Database Connection Error");
    console.log(error);
    throw error;
  }
};

export { connectToDatabase, pool };
