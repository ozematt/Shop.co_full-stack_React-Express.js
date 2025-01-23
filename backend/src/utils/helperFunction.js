import { poolPromise } from "../config/db.js";

// Funkcja pomocnicza do tworzenia tabel
export const createTable = async (query) => {
  try {
    await poolPromise.query(query);
    console.log(`Tabela została stworzona`);
  } catch (err) {
    console.error("Błąd przy tworzeniu tabeli:", err);
    throw err;
  }
};
