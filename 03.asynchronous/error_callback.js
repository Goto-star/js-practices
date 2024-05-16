#!/usr/bin/env node
import sqlite3 from "sqlite3";
const { Database } = sqlite3;
const db = new Database(":memory:");

// エラーありのプログラム(コールバック)
db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    insertRecord();
  },
);

// レコードの挿入
const insertRecord = () => {
  db.run("INSERT INTO books (title) VALUES (?)", "Book1", function () {
    console.log(`連番：${this.lastID}`);
    getRecord(this.lastID);
  });
};

// レコードの取得
const getRecord = (id) => {
  db.get("SELECT id, title FROM book", [id], function (err, row) {
    if (err) {
      console.error(err.message);
    } else if (row) {
      console.error(err.message);
    }
    deleteTable();
  });
};

// テーブルの削除
const deleteTable = () => {
  db.run("DROP TABLE books");
};
