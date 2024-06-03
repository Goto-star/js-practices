import sqlite3 from "sqlite3";
import { run, get } from "./sqlite_async_utils.js";

const db = new sqlite3.Database(":memory:");

await run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);

try {
  const result = await run(db, "INSERT INTO book (title) VALUES (?)", "Book1");
  console.log(result.lastID);
} catch (err) {
  if (
    err?.code === "SQLITE_ERROR" &&
    /^SQLITE_ERROR: no such table: \w+$/.test(err?.message)
  ) {
    console.error(err.message);
  } else {
    throw err;
  }
}

try {
  const row = await get(db, "SELECT iid, title FROM books");
  console.log(`ID = ${row.id}, Title = ${row.title}`);
} catch (err) {
  if (
    err?.code === "SQLITE_ERROR" &&
    /^SQLITE_ERROR: no such column: \w+$/.test(err?.message)
  ) {
    console.error(err.message);
  } else {
    throw err;
  }
}

await run(db, "DROP TABLE books");
