import sqlite3 from "sqlite3";
import { run, get, handleError } from "./sqlite_async_utils.js";

const db = new sqlite3.Database(":memory:");

// エラーありのプログラム(promise)
run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => run(db, "INSERT INTO book (title) VALUES (?)", "Book1"))
  .then((insertResult) => {
    console.log(insertResult.id);
  })
  .catch((err) => {
    handleError(err);
    return Promise.resolve();
  })
  .then(() => {
    return get(db, "SELECT iid, title FROM books");
  })
  .then((row) => {
    console.log(`ID = ${row.id}, Title = ${row.title}`);
  })
  .catch((err) => {
    handleError(err);
  })
  .then(() => run(db, "DROP TABLE books"));
