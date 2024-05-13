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
  console.log(`      ${argv.month}月 ${argv.year}`);
  console.log(`${days.join(" ")}`);
  console.log(displayAllDatesInMonth());
};

const displayAllDatesInMonth = () => {
  const dates = getAllDatesInMonth(argv.year, argv.month);
  const blank = "   ".repeat(dates[0].weekday);

  const formatted_dates = dates.map((date) => {
    let dateStr =
      `${date.day}`.padStart(2, " ") + (date.weekday === 6 ? "\n" : " ");
    if (dates[0] === date) {
      return blank + dateStr;
    }
    return dateStr;
  });

  return formatted_dates.join("");
};

const getAllDatesInMonth = (year, month) => {
  let dates = [];
  let date = DateTime.local(year, month, 1);

  while (date.month === month) {
    dates.push(date);
    date = date.plus({ days: 1 });
  }
  return dates;
};

calProgram();
