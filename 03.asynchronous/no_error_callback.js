#!/usr/bin/env node
import sqlite3 from "sqlite3";
const { Database } = sqlite3;
const db = new Database(":memory:");

// エラーなしのプログラム(コールバック)
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
  db.get(
    "SELECT id, title FROM books WHERE id = ?",
    [id],
    function (error, row) {
      console.log(`ID = ${row.id}, Title = ${row.title}`);
      deleteTable();
    },
  );
};

// レコードの削除
const deleteTable = () => {
  db.run("DROP TABLE books");
};
