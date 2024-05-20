#!/usr/bin/env node

import Memo from "./memo.js";
import MemoDatabase from "./memo_database.js";

(async () => {
  const db = new MemoDatabase("memos.db");
  await db.init();

  const app = new Memo(db);
  app.run();
})();
