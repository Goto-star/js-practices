#!/usr/bin/env node

import MemoDatabase from "./MemoDatabaseClass.js";
import Memo from "./MemoClass.js";

const db = new MemoDatabase("memos.db");
await db.init();

const memo = new Memo(db);
memo.run();
