let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

const mysql = require('mysql');
// var multer = require('multer');
// const path = require('path')
// const UPLOAD_PATH = path.resolve(__dirname, 'path/to/uploadedFiles')
// const upload = multer({
//   dest: UPLOAD_PATH,
//   limits: {fileSize: 1000000, files: 5}
// })
const mc = mysql.createConnection({
  host: 'localhost',
  port: '8889',
  user: 'root',
  password: 'root',
  database: 'handshake'
});

mc.connect();

// Express Route
const studentRoute = require('../backend/routes/student.route')
const companyRoute = require('../backend/routes/company.route')
const jobRoute = require('../backend/routes/jobs.route')
const applicationRoute = require('../backend/routes/application.route')
const eventRoute = require('../backend/routes/event.route')

const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: 'cmpe_273_secure_string',
  resave: true,
  saveUninitialized: true
}));

app.use(cors());
// app.use(multer({ dest: "./uploads/"}).single('photo'));


app.use('/students', studentRoute)
app.use('/companies', companyRoute)
app.use('/jobs', jobRoute)
app.use('/applications', applicationRoute)
app.use('/events', eventRoute)

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});