const run = (db, stmt, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(stmt, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
};

const get = (db, stmt, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(stmt, params, function (err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

export { run, get };
