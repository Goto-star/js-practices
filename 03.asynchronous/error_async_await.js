import sqlite3 from "sqlite3";
import { run, get } from "./sqlite_async_utils.js";

const db = new sqlite3.Database(":memory:");

try {
  await run(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );

  try {
    const result = await run(
      db,
      "INSERT INTO book (title) VALUES (?)",
      "Book1",
    );
    console.log(result.lastID);
  } catch (err) {
    if (err instanceof Error && err.message.includes("no such table")) {
      console.error(err.message);
    } else {
      throw err;
    }
  }

  try {
    const row = await get(db, "SELECT iid, title FROM books");
    console.log(`ID = ${row.id}, Title = ${row.title}`);
  } catch (err) {
    if (err && err.message && err.message.includes("no such column")) {
      console.error(err.message);
    } else {
      throw err;
    }
  }
} catch (err) {
  if (err instanceof Error) {
    console.error("エラーが発生しました: ", err.message);
  } else {
    console.error("予期しないエラーが発生しました: ", err);
  }
} finally {
  await run(db, "DROP TABLE books");
}
