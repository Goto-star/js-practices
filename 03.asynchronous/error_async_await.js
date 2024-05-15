import { run, get } from "./method_module.js";
import sqlite3 from "sqlite3";
const { Database } = sqlite3;
const db = new Database(":memory:");

// エラーありのプログラム(async/await)
const main = async () => {
  try {
    await run(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    );
    const lastID = await run(db, "INSERT INTO books (title) VALUES (?)", [
      "Book1",
    ]);
    console.log(`${lastID}`);
    const row = await get(db, "SELECT id, title FROM book WHERE id = ?", [
      lastID,
    ]);
    console.log(`ID = ${row.id}, Title = ${row.title}`);
    await run(db, "DROP TABLE books");
  } catch (err) {
    console.error(err.message);
  }
};

main();
