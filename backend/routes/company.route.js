
express = require('express'),
router = express.Router();
var sql = require('../database/sqldb');
var bcrypt = require('bcrypt');
var session = require('express-session');
var BCRYPT_SALT_ROUNDS = 12;
var multer = require('multer');
const path = require('path')
const UPLOAD_PATH = path.resolve(__dirname, 'path/to/uploadedFiles')
const upload = multer({
  dest: UPLOAD_PATH,
  limits: { files: 5}
});
var fs = require('fs');
// CREATE company


router.route('/create-company').post((req, res, next) => {
  console.log("hello");
  bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
      .then((hashedPass) => {
          req.body.password = hashedPass;
          console.log(req.body);
          sql.query("INSERT INTO companies SET ?", req.body, (error, data) => {
              if (error) {
                console.log(error);
                res.json(error)
              } else {
                console.log("new sql success");
                console.log(data)
                res.json(data)
              }
            })
      })
      .catch((err) => {
          console.log("Error saving company: ");
          console.log(error);
          next();
      });
});

router.route('/user').get((req, res, next) => {
  // var logged = session.isCompany;
  var user = session.user;
  console.log(session.user);
  var data = {
    user: user,
    isCompany: session.isCompany
  }
  res.json(data);
});

router.route('/logout').get((req,res) => {
  console.log("route hit")
  session.user = undefined;
  session.isCompany = false;
  res.json("done");
});

router.route('/login').post((req, res) => {
  sql.query("SELECT * FROM companies WHERE email = ?", [req.body.email], (error, user) => {
    if (error) {
      console.log(error);
      res.json(error);
    } else if (user[0] == null){
      res.json("No user with that email");
    } else {
      console.log(user);
      bcrypt.compare(req.body.password, user[0].password)
        .then(function(samePassword){
          if(!samePassword){
            res.json("Password invalid");
          } else {
            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
            session.user = user[0];
            session.isCompany = true;
            var data = {
              user: user[0],
              isCompany: session.isCompany
            }
            res.send(data);
          }
        });
      // res.json(user);
    }
  })
});


router.route('/create-job').post((req, res) => {
  req.body.company = session.user.id;
  console.log();
  console.log(req.body);
  sql.query("INSERT INTO jobs SET ?", req.body, (error, data) => {
    if (error) {
      console.log(error);
      res.json(error)
    } else {
      console.log("created");
      console.log(data)
      res.json("Added job");
    }
  })
});

router.route('/get-jobs').get((req,res) =>{
  sql.query("SELECT * FROM jobs WHERE company = ?", 
  [session.user.id],(error,jobs) => {
    if(error){
      console.log(error);
      res.json(error);
    } else {
      console.log("Jobs : ",JSON.stringify(jobs));
      res.end(JSON.stringify(jobs));
    }
  })
});

router.route('/get-applicants').post((req,res) =>{
  console.log(req.body)
  sql.query("SELECT students.name, students.id, applications.resFile, applications.status FROM applications, jobs, students WHERE jobs.id = ? AND applications.job = jobs.id AND applications.student = students.id", 
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



// Update company
router.route('/update-company').put((req, res, next) => {
  sql.query("UPDATE companies SET ? WHERE email = ?",
   [req.body, session.user.email],(error, data) => {
    if (error) {
      console.log(error)
      return next(error);
      
    } else {
      res.json(data)

      console.log(data);
      sql.query("SELECT * FROM companies WHERE email = ?", [req.body.email], 
        (error, user) => {
          if(error){
            console.log(error);
          } else {
            session.user = user[0];
          }
      })
      console.log('Company updated successfully !')
    }
  })
})


  
    router.route('/profPic').post(upload.array('image', 5), (req, res, next) => {
 

      const images = req.files.map((file) => {
        return {
          profPicFile: file.filename,
          profPicOG: file.originalname
        }
      })
      console.log(images);
      if (!images[0].profPicOG.match(/\.(gif|jpg|jpeg|tiff|png)$/i)){
        res.json("Not an image");
      } else {
    
        console.log(session.user.email);
        sql.query("UPDATE companies SET ? WHERE email = ?",
          [images[0], session.user.email],(error, data) => {
        if (error) {
          console.log(error)
          console.log('hello2');
          return next(error);
    
        } else {
    
            // res.json(data);
            // session.user = data;
            sql.query("SELECT * FROM companies WHERE email = ?", [session.user.email], 
            (error, user) => {
              if(error){
                console.log(error);
              } else {
                session.user = user[0];
              }
          })
            res.json('Picture uploaded successfully !')
          }
          })
        }
        })
    


    router.route('/profPic/').get((req, res, next) => {
      console.log(UPLOAD_PATH);
      console.log(session.user)
        fs.createReadStream(path.resolve(UPLOAD_PATH, session.user.profPicFile)).pipe(res)

      })


router.route('/create-event').post((req, res) => {
  req.body.company = session.user.id;

  console.log(req.body);
  sql.query("INSERT INTO events SET ?", req.body,(error, data) => {
    console.log("hello");
    if (error) {
      res.json(error)
    } else {
      console.log("created");
      console.log(data)
      res.json("Added event");
    }
  })
});


router.route('/get-events').get((req,res) =>{
  sql.query("SELECT * FROM events WHERE company = ?", [session.user.id], (error,events) => {
    if(error){
      console.log(error);
      res.json(error);
    } else {
      console.log("Events : ",JSON.stringify(events));
      res.end(JSON.stringify(events));
    }
  })
});

router.route('/getCompany/:id').get((req, res) => {
  console.log(req.params.id);
  sql.query("SELECT * FROM companies WHERE id = ?", [req.params.id], function(err, company){
    if(err){
      console.log(err);
    }
    else{
      console.log("Company: ", JSON.stringify(company));
      res.end(JSON.stringify(company));
    }
  });
});
module.exports = router;