import sqlite3 from "sqlite3";
import { run, get, handleError } from "./sqlite_async_utils.js";

const db = new sqlite3.Database(":memory:");

// エラーありのプログラム(async/await)
const main = async () => {
  await run(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );

  try {
    const insertResult = await run(
      db,
      "INSERT INTO books (title) VALUES (?)",
      "Book1",
    );
    await run(db, "INSERT INTO books (title) VALUES (?)", "Book1");
    console.log(insertResult.id);
  } catch (err) {
    if (err.message.includes("UNIQUE constraint failed")) {
      handleError(err);
    }
  }

  try {
    const row = await get(db, "SELECT iid, title FROM books");
    console.log(`ID = ${row.id}, Title = ${row.title}`);
  } catch (err) {
    if (err.message.includes("no such table")) {
      handleError(err);
    }
  }

  await run(db, "DROP TABLE books");
};

main();
