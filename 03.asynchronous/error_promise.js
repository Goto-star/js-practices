import { run, get } from "./method_module.js";
import sqlite3 from "sqlite3";
const { Database } = sqlite3;
const db = new Database(":memory:");

// エラーありのプログラム(promise)
run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => run(db, "INSERT INTO books (title) VALUES (?)", ["Book1"]))
  .then((lastID) => {
    console.log(`${lastID}`);
  })
  .catch((err) => {
    console.error(err.message);
    return Promise.resolve();
  })
  .then(() => {
    return get(db, "SELECT id, title FROM books");
  })
  .then((row) => {
    console.log(`ID = ${row.id}, Title = ${row.title}`);
  })
  .catch((err) => {
    console.error(err.message);
    return Promise.resolve();
  })
  .then(() => run(db, "DROP TABLE books"));
