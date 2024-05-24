import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

// db.run(
//   "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
//   () => {
//     insertAndGetRecord();
//   },
// );

// const insertAndGetRecord = () => {
//   db.run("INSERT INTO books (title) VALUES (?)", "Book1", function () {
//     console.log(this.lastID);
//     getRecordAndDeleteTable(this.lastID);
//   });
// };

// const getRecordAndDeleteTable = (id) => {
//   db.get("SELECT id, title FROM books WHERE id = ?", id, (_, row) => {
//     console.log(`ID = ${row.id}, Title = ${row.title}`);
//     deleteTable();
//   });
// };

// const deleteTable = () => {
//   db.run("DROP TABLE books");
// };

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run("INSERT INTO books (title) VALUES (?)", "Book1", function () {
      console.log(this.lastID);
      db.get(
        "SELECT id, title FROM books WHERE id = ?",
        this.lastID,
        (_, row) => {
          console.log(row.id, row.title);
          db.run("DROP TABLE books");
        },
      );
    });
  },
);
