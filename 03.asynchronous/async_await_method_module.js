const run = async (db, stmt, params = []) => {
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

const get = async (db, stmt, params = []) => {
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

const errorHandling = async (err) => {
  console.error(`${err.message}`);
};

export { run, get, errorHandling };
