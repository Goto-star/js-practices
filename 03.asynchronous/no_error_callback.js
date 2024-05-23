import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

// エラーなしのプログラム(コールバック)
db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    insertAndGetRecord();
  },
);

// レコードの挿入
const insertAndGetRecord = () => {
  db.run("INSERT INTO books (title) VALUES (?)", "Book1", function () {
    console.log(this.lastID);
    getRecordAndDeleteTable(this.lastID);
  });
};

// レコードの取得
const getRecordAndDeleteTable = (id) => {
  db.get("SELECT id, title FROM books WHERE id = ?", id, (_, row) => {
    console.log(`ID = ${row.id}, Title = ${row.title}`);
    deleteTable();
  });
};

// レコードの削除
const deleteTable = () => {
  db.run("DROP TABLE books");
};
