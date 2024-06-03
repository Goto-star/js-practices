import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run("INSERT INTO book (title) VALUES (?)", "Book1", function (err) {
      if (err) {
        console.error(err.message);
      } else {
        console.log(this.lastID);
      }
      db.get("SELECT iid, title FROM books", (err, row) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`ID = ${row.id}, Title = ${row.title}`);
        }
        db.run("DROP TABLE books");
      });
    });
  },
);
