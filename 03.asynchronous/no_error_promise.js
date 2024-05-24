import sqlite3 from "sqlite3";
import { run, get } from "./sqlite_async_utils.js";

const db = new sqlite3.Database(":memory:");

run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => run(db, "INSERT INTO books (title) VALUES (?)", "Book1"))
  .then((insertResult) => {
    console.log(insertResult.id);
    return get(db, "SELECT id, title FROM books WHERE id = ?", insertResult.id);
  })
  .then((row) => {
    console.log(`ID = ${row.id}, Title = ${row.title}`);
    run(db, "DROP TABLE books");
  });
