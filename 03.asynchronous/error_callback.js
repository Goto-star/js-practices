import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    insertRecord();
  },
);

const insertRecord = () => {
  db.run("INSERT INTO book (title) VALUES (?)", "Book1", function (err) {
    if (err) {
      console.error(err.message);
    } else {
      console.log(this.lastID);
    }
    getRecord();
  });
};

const getRecord = () => {
  db.get("SELECT iid, title FROM books", function (err, row) {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`ID = ${row.id}, Title = ${row.title}`);
    }
    deleteTable();
  });
};

const deleteTable = () => {
  db.run("DROP TABLE books");
};
