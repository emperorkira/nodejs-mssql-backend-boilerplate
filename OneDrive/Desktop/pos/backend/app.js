// IMPORTED LIBRARIES
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mssql = require('mssql');                     // Assuming you're using 'mssql' for database access.
const path = require('path');                       // Import the 'path' module for file path manipulation.

//IMPORT .ENV
require('dotenv').config();

const app = express();
const secretKey = process.env.SECRET_KEY;

// MIDDLEWARE
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory.

// CORS Configuration
/*
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header(
    'Access-Control-Allow-Headers',
    'Accept, Authorization, x-auth-token, Content-Type, X-Requested-With, Range'
  );
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  } else {
    return next();
  }
});*/
// INCLUDES

// Define a global error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'An error occurred' });
});

//ROUTER INDEX
const indexRouter = require("./app/routes/index");
app.use("/", indexRouter);

//EXPORT APP 
module.exports = app;