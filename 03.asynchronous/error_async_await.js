import { run, get } from "./method_module.js";
import sqlite3 from "sqlite3";
const { Database } = sqlite3;
const db = new Database(":memory:");

// エラーありのプログラム(async/await)
const main = async () => {
  await run(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );

  let lastID;
  try {
    lastID = await run(db, "INSERT INTO book (title) VALUES (?)", ["Book1"]);
    console.log(`${lastID}`);
  } catch (err) {
    console.log(`${err.message}`);
  }

  let row;
  try {
    row = await get(db, "SELECT id, title FROM books");
    console.log(`ID = ${row.id}, Title = ${row.title}`);
  } catch (err) {
    console.log(`${err.message}`);
  }

  await run(db, "DROP TABLE books");
};

main();
