const db = require("./database.js");

const jobsList = [
  {
    position: "Product Manager",
    company: "General Assembly",
    salary: 20000,
    city_location: "San Francisco",
    country_location: "USA",
    profession_id: 1,
    week_posted: 30,
    is_fulltime: 1
  },
  {
    position: "Product Manager",
    company: "Assembly General",
    salary: 25000,
    city_location: "San Francisco",
    country_location: "USA",
    profession_id: 1,
    week_posted: 30,
    is_fulltime: 0
  },
  {
    position: "Product Manager",
    company: "TASK Rabbit",
    salary: 130000,
    city_location: "San Francisco",
    country_location: "USA",
    profession_id: 1,
    week_posted: 47,
    is_fulltime: 1
  },
  {
    position: "Associate Product Manager",
    company: "SISENSE",
    salary: null,
    city_location: "San Francisco",
    country_location: "USA",
    profession_id: 4,
    week_posted: 46,
    is_fulltime: 1
  },
  {
    position: "Product Manager",
    company: "Accellion",
    salary: 123000,
    city_location: "Palo Alto",
    country_location: "USA",
    profession_id: 1,
    week_posted: 43,
    is_fulltime: 1
  }
];

module.exports = db;
