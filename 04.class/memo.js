#!/usr/bin/env node

import Memo from "./MemoClass.js";
import MemoDatabase from "./MemoDatabaseClass.js";

(async () => {
  const db = new MemoDatabase("memos.db");
  await db.init();

  const app = new Memo(db);
  app.run();
})();
