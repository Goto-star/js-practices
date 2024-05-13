#!/usr/bin/env node
import minimist from "minimist";

const argv = minimist(process.argv.slice(2), {
  alias: {
    y: "year",
    m: "month",
  },
});

console.log(argv);
