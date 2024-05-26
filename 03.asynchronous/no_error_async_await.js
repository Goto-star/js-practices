import sqlite3 from "sqlite3";
import { run, get } from "./sqlite_async_utils.js";

const db = new sqlite3.Database(":memory:");

await run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);

const result = await run(db, "INSERT INTO books (title) VALUES (?)", "Book1");
console.log(result.lastID);

const row = await get(
  db,
  "SELECT id, title FROM books WHERE id = ?",
  result.lastID,
);
console.log(`ID = ${row.id}, Title = ${row.title}`);

await run(db, "DROP TABLE books");
