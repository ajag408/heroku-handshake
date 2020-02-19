let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
let dbConfig = require('./database/db');
// var multer = require('multer');
// const path = require('path')
// const UPLOAD_PATH = path.resolve(__dirname, 'path/to/uploadedFiles')
// const upload = multer({
//   dest: UPLOAD_PATH,
//   limits: {fileSize: 1000000, files: 5}
// })

// Express Route
const studentRoute = require('../backend/routes/student.route')
const companyRoute = require('../backend/routes/company.route')

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true
}).then(() => {
  console.log('Database sucessfully connected!')
},
  error => {
    console.log('Could not connect to database : ' + error)
  }
)

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
// app.post('/company/profPic', upload.array('image',5), (req, res, next) => {
//   console.log('hello');
//   const images = req.files.map((file) => {
//     return {
//       filename: file.filename,
//       originalname: file.originalname
//     }
//   })
//   companySchema.findOne({email: session.user.email}, {
//   }, (error, data) => {
//     if (error) {
//       console.log(error)
//       console.log('hello2');
//       return next(error);

//     } else {
//       data.profPicFile = images.filename;
//       data.profPicOG = images.originalname;
//       data.save(function(err){
//         if(err){
//           console.log('hello3');
//           console.log(err);
//         }
//         console.log(data);
//         session.user = data;
//         console.log('Picture uploaded successfully !')
//       });

//     }
//   })
// })


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