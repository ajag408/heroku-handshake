express = require('express'),
router = express.Router();
var sql = require('../database/sqldb');
var session = require('express-session');
var multer = require('multer');
const path = require('path')
const UPLOAD_PATH = path.resolve(__dirname, 'path/to/uploadedFiles')
const upload = multer({
  dest: UPLOAD_PATH,
  limits: { files: 5}
});
var moment = require('moment');
var fs = require('fs');


router.route('/get-applicants').post((req,res) =>{
    console.log(req.body)
    sql.query("SELECT students.name, students.id, applications.resFile, applications.status, applications.id AS appID FROM applications, jobs, students WHERE jobs.id = ? AND applications.job = jobs.id AND applications.student = students.id", 
    [req.body.id],(error,applicants) => {
      if(error){
        console.log(error);
        res.json(error);
      } else {
        console.log("Applicants : ",JSON.stringify(applicants));
        res.end(JSON.stringify(applicants));
      }
    })
  });


  router.route('/updateApplication').post((req,res) =>{
    console.log(req.body)
    sql.query("UPDATE applications SET status = ? WHERE id = ?", 
    [req.body.status, req.body.id],(error,application) => {
      if(error){
        console.log(error);
        res.json(error);
      } else {
        console.log(application);
    
        res.end("Success");
      }
    })
  });
  
  router.route('/jobApply').post((req,res) => {
    console.log("in job apply");
    console.log(req.body.id);
    session.jobID = req.body.id;
  })



  router.route('/resume').post(upload.array('resume', 5), (req, res, next) => {
    console.log(req.files);
    const resume = req.files.map((file) => {
      console.log("in resume");
      console.log(session.jobID);
      return {
        resFile: file.filename,
        resOG: file.originalname,
        job: session.jobID,
        student: session.user.id,
        status: "Pending",
        created:  moment(Date.now()).format('YYYY-MM-DD')
      }
    })
    console.log(resume);
    if (!resume[0].resOG.match(/\.(pdf)$/i)){
      res.json("Not a PDF");
    } else {
  
      // console.log(session.user.email);
      // resume[0].student = session.user.id;
      sql.query("INSERT INTO applications SET ?",
       resume[0] ,(error, data) => {
      if (error) {
        console.log(error)
        console.log('hello2');
        return next(error);
  
      } else {
  
          // res.json(data);
          // session.user = data;
          res.json('Resume uploaded successfully !')
        }
        })
      }
    })

router.route('/getResume/:resFile').get((req, res, next) => {
    console.log(UPLOAD_PATH);
    // console.log(session.user)
    fs.createReadStream(path.resolve(UPLOAD_PATH, req.params.resFile)).pipe(res)

})

      

module.exports = router;