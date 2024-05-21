#!/usr/bin/env node
import minimist from "minimist";
import { DateTime } from "luxon";

const argv = minimist(process.argv.slice(2), {
  alias: {
    y: "year",
    m: "month",
  },
});

const now = DateTime.now();
const year = argv.year || now.year;
const month = argv.month || now.month;
const days = ["日", "月", "火", "水", "木", "金", "土"];

const calProgram = () => {
  console.log(`      ${month}月 ${year}`);
  console.log(`${days.join(" ")}`);
  console.log(displayAllDatesInMonth());
};

const displayAllDatesInMonth = () => {
  const dates = getAllDatesInMonth(year, month);
  const first_day_weekday = dates[0].weekday == 7 ? 0 : dates[0].weekday;
  const blank = "   ".repeat(first_day_weekday);

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

const getAllDatesInMonth = () => {
  let dates = [];
  let date = DateTime.local(year, month, 1);

  while (date.month === month) {
    dates.push(date);
    date = date.plus({ days: 1 });
  }
  return dates;
};

calProgram();
