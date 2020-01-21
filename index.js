// Load express
let express = require("express");
let database = require("./database.js");

// Create our express app
let app = express();

app.use(express.json());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/*******************************************************************************
 *
 * TODO: JOBS ROUTES
 *
 */

// get all Jobs
app.get("/api/Jobs", (req, res) => {
  let getAllJobs = "SELECT *, oid  FROM Jobs";
  database.all(getAllJobs, (error, results) => {
    if (error) {
      console.log("Get all Jobs table failed", error);
      res.sendStatus(500);
    } else {
      res.status(200).json(results);
    }
  });
});

//GET one Job
app.get("/api/Jobs/:id", (req, res) => {
  let jobId = req.params.id;
  let getOneJob = `SELECT * , Jobs.rowid FROM Jobs WHERE jobs.oid = ${jobId}`;
  database.all(getOneJob, (error, result) => {
    if (error) console.log("could not retrieve Job Listing", error);
    else {
      res.status(200).json(result);
    }
  });
});

//Create One JOB

app.post("/api/Jobs", (req, res) => {
  let createNewJob = [
    req.body.jobId,
    req.body.position,
    req.body.company,
    req.body.salary,
    req.body.city
  ];
  let insertNewJob = "INSERT INTO Jobs VALUES ( ?, ?, ?, ?, ?)";
  database.run(insertNewJob, createNewJob, error => {
    if (error) {
      console.log("Could not add a Job to the Jobs Table", error);
      res.sendStatus(500);
    } else {
      let getAllJobs = "SELECT * FROM Jobs";

      database.all(getAllJobs, (error, results) => {
        if (error) {
          console.log("Get all Jobs table failed", error);
          res.sendStatus(500);
        } else {
          res.status(200).json(results);
        }
      });
    }
  });
});

//UPDATE ONE JOB

app.put("/api/Jobs/:id", (req, res) => {
  let jobId = parseInt(req.params.id);
  console.log(req.body);
  let queryHelper = Object.keys(req.body).map(
    ele => `${ele.toUpperCase()} = ?`
  );
  let updateOneJob = `UPDATE Jobs SET ${queryHelper.join(
    ", "
  )} WHERE Jobs.oid = ?`;
  let queryValues = [...Object.values(req.body), jobId];

  database.run(updateOneJob, queryValues, function(error) {
    if (error) {
      console.log(new Error("Could not update Job Lising Information"), error);
      res.sendStatus(500);
    } else {
      console.log(`Job with ID ${jobId} was updated successfully`);

      let getAllJobs = "SELECT *, oid  FROM Jobs";
      database.all(getAllJobs, (error, results) => {
        if (error) {
          console.log("Get all Jobs table failed", error);
          res.sendStatus(500);
        } else {
          res.status(200).json(results);
        }
      });
    }
  });
});

//DELETE ONE JOB

app.delete("/api/Jobs/:id", (req, res) => {
  let jobId = req.params.id;
  let deleteByJobId = `DELETE FROM Jobs WHERE Jobs.oid = ?`;
  // let deleteByJobId = `DELETE FROM Jobs WHERE Jobs.oid = ?`;
  // let jobId = req.params.id;
  database.run(deleteByJobId, jobId, function(error) {
    if (error) {
      console.log("Could not delete Job listing", error);
      res.sendStatus(500);
    } else {
      console.log("Job Listing Deleted");
      let getAllJobs = "SELECT * FROM Jobs";
      database.all(getAllJobs, function(error, results) {
        if (error) {
          console.log(new Error("Get all Jobs table failed"), error);
          res.sendStatus(500);
        } else {
          res.status(200).json(results);
        }
      });
    }
  });
});

// Tell the app to listen on port 3000
// for HTTP requests from clients
app.listen(3000, function() {
  console.log("Listening on port 3000");
});
