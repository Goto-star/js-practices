#!/usr/bin/env node

import MemoDatabase from "./MemoDatabase.js";
import MemoApp from "./MemoApp.js";

const db = new MemoDatabase("memos.db");
await db.init();

const memoApp = new MemoApp(db);
memoApp.run();
