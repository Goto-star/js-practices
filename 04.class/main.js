#!/usr/bin/env node

import Memo from "./memo.js";
import MemoDatabase from "./memo_database.js";

const db = new MemoDatabase("memos.db");
db.init();

const app = new Memo(db);
app.run();
