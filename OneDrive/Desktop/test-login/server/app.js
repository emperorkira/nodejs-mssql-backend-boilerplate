// IMPORTED LIBRARIES
const express = require('express'), cors = require('cors'), cookieParser = require('cookie-parser'), session = require('express-session');
const bodyParser = require('body-parser'), path = require('path'), app = express(), SECRET_KEY = process.env.SECRET_KEY || 'HMQfQ5s4cta$%hShgvavvjfs%6ScFSVh';
const { checkUser } = require('./app/middleware/authMiddleware');

//  Use express-session for session management
app.use(session({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));

// MIDDLEWARE
// Use CORS middleware with explicit origin
app.use(cors({
  origin: 'http://localhost:5173', // Replace with the actual origin of your Angular app
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

// Your routes and other middleware go here
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//  Define a global error handler middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: 'An error occurred' });
  next();
})

// Handle preflight requests
app.options('/*', (req, res) => {
  res.status(204).end();
});
/*
//  NO CACHE
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  next();
});
*/
//  SET USER AS LOCAL
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
})

//  ROUTER INDEX
const indexRouter = require('./app/routes/index');
app.use('/', indexRouter);
app.get("*", checkUser); 

// EXPORT APP
module.exports = app;
