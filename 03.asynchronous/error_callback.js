#!/usr/bin/env node
import sqlite3 from "sqlite3";
const { Database } = sqlite3;
const db = new Database(":memory:");

// エラーありのプログラム
db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    insertRecord();
  },
);

// レコードの挿入
const insertRecord = () => {
  db.run("INSERT INTO book (title) VALUES (?)", "Book1", function (err) {
    console.error(err.message);
    getRecord();
  });
};

// レコードの取得
const getRecord = () => {
  db.get("SELECT id, title FROM book", function (err) {
    console.error(err.message);
    deleteTable();
  });
};

// テーブルの削除
const deleteTable = () => {
  db.run("DROP TABLE books");
};
