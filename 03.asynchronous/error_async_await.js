import sqlite3 from "sqlite3";
import { run, get, errorHandling } from "./async_await_method_module.js";

const db = new sqlite3.Database(":memory:");

// エラーありのプログラム(async/await)
const main = async () => {
  await run(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );

  let lastID;
  try {
    lastID = await run(db, "INSERT INTO books (title) VALUES (?)", ["Book1"]);
    console.log(`${lastID}`);
  } catch (err) {
    errorHandling(err);
  }

  let row;
  try {
    row = await get(db, "SELECT id, title FROM books");
    console.log(`ID = ${row.id}, Title = ${row.title}`);
  } catch (err) {
    errorHandling(err);
  }

  await run(db, "DROP TABLE books");
};

main();
