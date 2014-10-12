var app = require("express")();
var mongoose = require("mongoose");
var routes = require("./routes");

mongoose.connect("mongodb://ispaaa:sejahtera@kahana.mongohq.com:10095/app26192063");

mongoose.connection.on("error", function (err) {
  console.log("Database connection failed. Error: " + err);
});

mongoose.connection.once("open", function () {
  console.log("Successfully connected to database.");
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Database connection terminated.");
    process.exit();
  });
});

