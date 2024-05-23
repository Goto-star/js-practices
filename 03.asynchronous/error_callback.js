import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

// エラーありのプログラム(コールバック)
db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    insertRecord();
  },
);

// レコードの挿入
const insertRecord = () => {
  db.run("INSERT INTO book (title) VALUES (?)", "Book1", function (err) {
    if (err) {
      console.error(err.message);
    }
    getRecord();
  });
};

// レコードの取得
const getRecord = () => {
  db.get("SELECT id, title FROM book", function (err) {
    if (err) {
      console.error(err.message);
    }
    deleteTable();
  });
};

// テーブルの削除
const deleteTable = () => {
  db.run("DROP TABLE books");
};