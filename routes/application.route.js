const express = require('express');

const router = express.Router();

const session = require('express-session');
const multer = require('multer');
const path = require('path');

const UPLOAD_PATH = path.resolve(__dirname, 'path/to/uploadedFiles');
const upload = multer({
  dest: UPLOAD_PATH,
  limits: { files: 5 },
});
const moment = require('moment');
const fs = require('fs');
const sql = require('../database/sqldb');

router.route('/get-applicants').post((req, res) => {
  console.log(req.body);
  sql.query('SELECT students.name, students.id, applications.resFile, applications.status, applications.id AS appID FROM applications, jobs, students WHERE jobs.id = ? AND applications.job = jobs.id AND applications.student = students.id',
    [req.body.id], (error, applicants) => {
      if (error) {
        console.log(error);
        res.json(error);
      } else {
        console.log('Applicants : ', JSON.stringify(applicants));
        res.end(JSON.stringify(applicants));
      }
    });
});


router.route('/updateApplication').post((req, res) => {
  console.log(req.body);
  sql.query('UPDATE applications SET status = ? WHERE id = ?',
    [req.body.status, req.body.id], (error, application) => {
      if (error) {
        console.log(error);
        res.json(error);
      } else {
        console.log(application);

        res.end('Success');
      }
    });
});

router.route('/jobApply').post((req) => {
  console.log('in job apply');
  console.log(req.body.id);
  session.jobID = req.body.id;
});


router.route('/resume').post(upload.array('resume', 5), (req, res, next) => {
  console.log(req.files);
  const resume = req.files.map((file) => {
    console.log('in resume');
    console.log(session.jobID);
    return {
      resFile: file.filename,
      resOG: file.originalname,
      job: session.jobID,
      student: session.user.id,
      status: 'Pending',
      created: moment(Date.now()).format('YYYY-MM-DD'),
    };
  });
  console.log(resume);
  if (!resume[0].resOG.match(/\.(pdf)$/i)) {
    res.json('Not a PDF');
  } else {
    // console.log(session.user.email);
    // resume[0].student = session.user.id;
    sql.query('INSERT INTO applications SET ?',
      resume[0], (error) => {
        if (error) {
          console.log(error);
          console.log('hello2');
          return next(error);
        }
        // res.json(data);
        // session.user = data;
        res.json('Resume uploaded successfully !');
        return 0;
      });
  }
});

router.route('/getResume/:resFile').get((req, res) => {
  console.log(UPLOAD_PATH);
  // console.log(session.user)
  try{
    if(fs.existsSync(path.resolve(UPLOAD_PATH, req.params.resFile))){
      fs.createReadStream(path.resolve(UPLOAD_PATH, req.params.resFile)).pipe(res);
    }
  }
  catch(err){
    console.log("uploaded on another server");
    alert("resume not available");
  }
});


module.exports = router;
