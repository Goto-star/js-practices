#!/usr/bin/env node
import minimist from "minimist";
import { DateTime } from "luxon";

const argv = minimist(process.argv.slice(2), {
  alias: {
    y: "year",
    m: "month",
  },
});

const days = ["日", "月", "火", "水", "木", "金", "土"];

const calProgram = () => {
  console.log(`${argv.month}月 ${argv.year}`);
  console.log(`${days.join(" ")}`);
  console.log(getAllDatesInMonth(argv.year, argv.month));
};

const getAllDatesInMonth = (year, month) => {
  let dates = [];
  let date = DateTime.local(year, month, 1);

  while (date.month === month) {
    dates.push(date.day);
    date = date.plus({ days: 1 });
  }

  return dates.join(" ");
};

calProgram();
