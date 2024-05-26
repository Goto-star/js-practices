import readline from "readline";
import inquirer from "inquirer";

export default class MemoApp {
  constructor(db) {
    this.db = db;
  }

  run() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
      this.#addMemo();
      return;
    }
    switch (args[0]) {
      case "-l":
        this.#listMemos();
        break;
      case "-r":
        this.#readMemo();
        break;
      case "-d":
        this.#deleteMemo();
        break;
      default:
        console.log("不明なオプションです");
    }
  }

  #getInput() {
    return new Promise((resolve, reject) => {
      const lines = [];
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
      });

      rl.on("line", (input) => {
        lines.push(input);
      });
      rl.on("close", () => {
        const content = lines.join("\n");
        if (content.trim() !== "") {
          resolve(content);
        } else {
          reject(new Error("入力してください"));
        }
      });
    });
  }

  async #addMemo() {
    try {
      const content = await this.#getInput();
      await this.db.insertMemo(content);
    } catch (empty_warning) {
      console.log(empty_warning);
    }
  }

  async #listMemos() {
    const memos = await this.db.getAllMemos();

    if (memos.length === 0) {
      console.error("メモが空です");
      return "";
    }
    memos.forEach((memo) => {
      console.log(memo.content.split("\n")[0]);
    });
  }

  async #readMemo() {
    const memos = await this.db.getAllMemos();

    if (memos.length === 0) {
      console.error("メモが空です");
      return "";
    }
    const choices = memos.map((memo) => ({
      name: memo.content.split("\n")[0],
      value: memo.id,
    }));
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "memoIdToDelete",
        message: "Choose a memo you want to see:",
        choices,
      },
    ]);

    const memo = await this.db.getMemo(answer.memoIdToDelete);
    console.log(memo.content);
  }

  async #deleteMemo() {
    const memos = await this.db.getAllMemos();

    if (memos.length === 0) {
      console.error("メモが空です");
      return;
    }
    const choices = memos.map((memo) => ({
      name: memo.content.split("\n")[0],
      value: memo.id,
    }));
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "selectDeleteMemoId",
        message: "Choose a memo you want to delete:",
        choices,
      },
    ]);

    await this.db.deleteMemo(answer.selectDeleteMemoId);
  }
}
