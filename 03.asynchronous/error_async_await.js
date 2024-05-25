import sqlite3 from "sqlite3";
import { run, get } from "./sqlite_async_utils.js";

const db = new sqlite3.Database(":memory:");

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
  if (!(err instanceof Error)) {
    console.log("エラーオブジェクトではありません");
  } else if (err.message.includes("UNIQUE constraint failed")) {
    console.log(err.message);
  } else {
    console.log("エラーが発生しました");
  }
}

try {
  const row = await get(db, "SELECT id, title FROM book");
  console.log(`ID = ${row.id}, Title = ${row.title}`);
} catch (err) {
  if (!(err instanceof Error)) {
    console.log("エラーオブジェクトではありません");
  } else if (err.message.includes("no such table")) {
    console.log(err.message);
  } else {
    console.log("エラーが発生しました");
  }
}

await run(db, "DROP TABLE books");
