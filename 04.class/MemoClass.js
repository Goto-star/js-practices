import readline from "readline";
import inquirer from "inquirer";

class Memo {
  constructor(db) {
    this.db = db; // データベース接続オブジェクトの受け取り
  }

  async run() {
    const args = process.argv.slice(2); // コマンドライン引数を取得

    if (args.length === 0) {
      this.addMemo();
      return;
    }
    switch (args[0]) {
      case "-l":
        this.listMemos();
        break;
      case "-r":
        this.readMemo();
        break;
      case "-d":
        this.deleteMemo();
        break;
      default:
        console.log("不明なオプションです");
    }
  }

  async addMemo() {
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
      if (content) {
        await this.db.insertMemo(content);
      } else {
        console.log("メモが空です");
      }
    });
  }

  async listMemos() {
    const memos = await this.db.getAllMemos();
    memos.forEach((memo) => {
      console.log(`${memo.content.split("\n")[0]}`);
    });
  }

  async readMemo() {
    const memos = await this.db.getAllMemos();
    const choices = memos.map((memo) => ({
      name: memo.content.split("\n")[0],
      value: memo.id,
    }));

    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "selectedMemoId",
        message: "Choose a note you want to see:",
        choices: choices,
      },
    ]);

    const fullMemo = await this.db.getMemo(answer.selectedMemoId);
    console.log(`${fullMemo.content}`);
  }

  async deleteMemo() {
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
        choices: choices,
      },
    ]);

    await this.db.deleteMemo(answer.selectDeleteMemoId);
  }
}

export default Memo;