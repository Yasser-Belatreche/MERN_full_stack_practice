// Full Documentation - https://docs.turbo360.co
const vertex = require("vertex360")({ site_id: process.env.TURBO_APP_ID });
const express = require("express");

const app = express(); // initialize app

const config = {
  views: "views", // Set views directory
  static: "public", // Set static assets directory
  db: {
    // Database configuration. Remember to set env variables in .env file: , PROD_MONGODB_URI
    url: "mongodb://localhost/mongodb-proj",
    type: "mongo",
    onError: (err) => {
      console.log("DB Connection Failed!");
    },
    onSuccess: () => {
      console.log("DB Successfully Connected!");
    },
  },

  /*  To use the Turbo 360 CMS, from the terminal run
      $ turbo extend cms
      then uncomment line 21 below: */

  db: vertex.nedb(),
};

vertex.configureApp(app, config);

// import routes
const index = require("./routes/index");
const api = require("./routes/api"); // sample API Routes

// set routes
app.use("/", index);
app.use("/api", api); // sample API Routes

module.exports = app;
