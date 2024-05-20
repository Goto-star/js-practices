import sqlite3 from "sqlite3";
import { open } from "sqlite";

class MemoDatabase {
  constructor(filename) {
    this.filename = filename;
    this.db = null;
  }

  async init() {
    this.db = await open({
      filename: this.filename,
      driver: sqlite3.Database,
    });
    await this.db.run(`
      CREATE TABLE IF NOT EXISTS memos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL
      )
    `);
  }

  async insertMemo(content) {
    await this.db.run("INSERT INTO memos (content) VALUES (?)", content);
  }

  async getAllMemos() {
    return await this.db.all("SELECT id, content FROM memos");
  }
}

export default MemoDatabase;
