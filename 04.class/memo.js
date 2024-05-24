#!/usr/bin/env node

import Memo from "./MemoClass.js";
import MemoDatabase from "./MemoDatabaseClass.js";

const db = new MemoDatabase("memos.db");
await db.init();

const memo = new Memo(db);
memo.run();
