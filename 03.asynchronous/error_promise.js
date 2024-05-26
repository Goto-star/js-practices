import sqlite3 from "sqlite3";
import { run, get } from "./sqlite_async_utils.js";

const db = new sqlite3.Database(":memory:");

run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => run(db, "INSERT INTO book (title) VALUES (?)", "Book1"))
  .then((result) => {
    console.log(result.lastID);
  })
  .catch((err) => {
    console.error(err.message);
  })
  .then(() => get(db, "SELECT iid, title FROM books"))
  .then((row) => {
    console.log(`ID = ${row.id}, Title = ${row.title}`);
  })
  .catch((err) => {
    console.error(err.message);
  })
  .then(() => run(db, "DROP TABLE books"));
