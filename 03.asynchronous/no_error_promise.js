import { run, get } from "./promise_method_module.js";
import sqlite3 from "sqlite3";
const { Database } = sqlite3;

const db = new Database(":memory:");

// エラーなしのプログラム(promise)
run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => run(db, "INSERT INTO books (title) VALUES (?)", ["Book1"]))
  .then((lastID) => {
    console.log(`${lastID}`);
    return get(db, "SELECT id, title FROM books WHERE id = ?", [lastID]);
  })
  .then((row) => {
    console.log(`ID = ${row.id}, Title = ${row.title}`);
  })
  .then(() => run(db, "DROP TABLE books"));
