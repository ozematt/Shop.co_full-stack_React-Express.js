// Funkcja pomocnicza do tworzenia tabel
export const createTable = async (query) => {
  try {
    const [results] = await connection.query(query);
    console.log("Tabela utworzona / istnieje już:", results);
  } catch (err) {
    console.error("Błąd podczas tworzenia tabeli:", err);
    throw err;
  }
};
