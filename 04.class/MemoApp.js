import readline from "readline";
import inquirer from "inquirer";

class MemoApp {
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

  async #getInput() {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const lines = [];
      rl.on("line", (input) => {
        lines.push(input);
      });

      rl.on("close", async () => {
        const content = lines.join("\n");
        if (content.trim() !== "") {
          resolve(content);
        } else {
          reject("メモが空です");
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
    memos.forEach((memo) => {
      console.log(`${memo.content.split("\n")[0]}`);
    });
  }

  async #readMemo() {
    const memos = await this.db.getAllMemos();
    const choices = memos.map((memo) => ({
      name: memo.content.split("\n")[0],
      value: memo.id,
    }));

    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "selectedMemoId",
        message: "Choose a memo you want to see:",
        choices,
      },
    ]);

    const fullMemo = await this.db.getMemo(answer.selectedMemoId);
    console.log(fullMemo.content);
  }

  async #deleteMemo() {
    const memos = await this.db.getAllMemos();
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

export default MemoApp;
