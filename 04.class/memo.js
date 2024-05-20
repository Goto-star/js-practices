import process from "process";

class Memo {
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
    console.log("add");
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
