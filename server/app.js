'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const { db } = require('./models');
const router = require('./routes');


const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

// failure to catch req above means 404, forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// handle any errors
app.use(function(err, req, res, next) {
  console.error(err, err.stack);
  res.status(err.status || 500);
  res.send("Something went wrong: " + err.message);
});

// listen on a port
var port = 3000;
app.listen(port, function() {
  console.log("The server is listening closely on port", port);
  db
    .sync()
    .then(function() {
      console.log("Synchronated the database");
    })
    .catch(function(err) {
      console.error("Trouble right here in River City", err, err.stack);
    });
});

