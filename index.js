// Load express
let express = require("express");
let database = require("./database.js");

// Create our express app
let app = express();

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

// Tell the app to listen on port 3000
// for HTTP requests from clients
app.listen(3000, function() {
  console.log("Listening on port 3000");
});
