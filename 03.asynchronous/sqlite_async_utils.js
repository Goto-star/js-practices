const run = (db, stmt, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(stmt, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          id: this.lastID,
          changes: this.changes,
        });
      }
    });
  });
};

const get = (db, stmt, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(stmt, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

export { run, get };
