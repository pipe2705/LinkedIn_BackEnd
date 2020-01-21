let sqlite3 = require("sqlite3");

let database = new sqlite3.Database("./database.db");

database.serialize(() => {
  const createTableJobsQuery =
    "CREATE TABLE IF NOT EXISTS Jobs(jobId INTEGER, position TEXT, company TEXT, salary INTEGER, city TEXT)";

  database.run(createTableJobsQuery, error => {
    if (error) console.log(new Error("Create Job Seeker table failed"), error);
    else console.log("Create new Job Seeker table succeeded!");
  });
});

module.exports = database;
