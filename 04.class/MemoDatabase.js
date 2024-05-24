import sqlite3 from "sqlite3";
import { open } from "sqlite";
import dedent from "dedent";

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

    await this.db.run(dedent`
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
    const memos = await this.db.all(
      "SELECT id, content FROM memos ORDER BY id DESC",
    );

    if (memos.length === 0) {
      console.error("メモが空です");
      return;
    }
    return memos;
  }

  getMemo(id) {
    return this.db.get("SELECT content FROM memos WHERE id = ?", [id]);
  }

  async deleteMemo(id) {
    await this.db.run("DELETE FROM memos WHERE id = ?", id);
  }
}

export default MemoDatabase;
