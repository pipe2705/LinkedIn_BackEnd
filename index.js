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

//Create One JOB

app.post("/api/Jobs", (req, res) => {
  let createNewJob = [
    req.body.jobId,
    req.body.position,
    req.body.company,
    req.body.salary,
    req.body.city_location
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

// Tell the app to listen on port 3000
// for HTTP requests from clients
app.listen(3000, function() {
  console.log("Listening on port 3000");
});
