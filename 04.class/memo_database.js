import sqlite3 from "sqlite3";
import { open } from "sqlite";

class MemoDatabase {
  constructor(filename) {
    this.filename = filename; // データベースファイルの名前
    this.db = null; // データベース接続オブジェクトを初期化
  }

  async init() {
    // データベース接続を開く
    this.db = await open({
      filename: this.filename,
      driver: sqlite3.Database,
    });

    // データベースが存在しない場合は作成
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

  async getMemo(id) {
    return await this.db.get("SELECT content FROM memos WHERE id = ?", [id]);
  }

  async deleteMemo(id) {
    await this.db.run("DELETE FROM memos WHERE id = ?", id);
  }
}

export default MemoDatabase;
