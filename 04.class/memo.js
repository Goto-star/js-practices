import readline from "readline";

class Memo {
  constructor(db) {
    this.db = db;
  }

  async run() {
    const args = process.argv.slice(2);
    // switch文に修正
    if (args.length === 0) {
      this.addMemo();
    } else if (args[0] === "-l") {
      this.listMemos();
    } else if (args[0] === "-r") {
      this.readMemo();
    } else if (args[0] === "-d") {
      this.deleteMemo();
    } else {
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
      if (lines) {
        await this.db.insertMemo(lines);
      } else {
        console.log("メモが空です");
      }
    });
  }

  async listMemos() {
    console.log("list");
  }

  async readMemo() {
    console.log("read");
  }

  async deleteMemo() {
    console.log("delete");
  }
}

export default Memo;
