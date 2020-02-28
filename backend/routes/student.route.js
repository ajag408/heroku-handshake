
  express = require('express'),
  router = express.Router();
  var bcrypt = require('bcrypt');
  var session = require('express-session');
  var sql = require('../database/sqldb');
  var multer = require('multer');
const path = require('path')
const UPLOAD_PATH = path.resolve(__dirname, 'path/to/uploadedFiles')
const upload = multer({
  dest: UPLOAD_PATH,
  limits: { files: 5}
});
var moment = require('moment');
var fs = require('fs');
// Student Model

var BCRYPT_SALT_ROUNDS = 12;
// CREATE Student
router.route('/create-student').post((req, res, next) => {
  bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
  .then((hashedPass) => {
    req.body.password = hashedPass;
    sql.query("INSERT INTO students SET ?", req.body, (error, data) => {
      if (error) {
       res.json(error);
      } else {
        console.log(data)
        res.json(data)
      }
    })
  })
  .catch((err) => {
      console.log("Error saving student: ");
      console.log(error);
      next();
  });
});

router.route('/user').get((req, res, next) => {
  var user = session.user;
  // console.log(session.user);
  var data = {
    user: user,
    isStudent: session.isStudent
  }
  res.json(data);
});

router.route('/logout').get((req,res) => {
  console.log("route hit")
  session.user = undefined;
  session.isStudent = false;
  res.json("done");
});


router.route('/login').post((req, res) => {
  sql.query("SELECT * FROM students WHERE email = ?", [req.body.email], (error, user) => {
    if (error) {
      console.log(error);
      res.json(error);
    } else if (user[0] == null){
      res.json("No user with that email");
    } else {
      bcrypt.compare(req.body.password, user[0].password)
        .then(function(samePassword){
          if(!samePassword){
            res.json("Password invalid");
          } else {
            session.user = user[0];
            session.isStudent = true;
            var data = {
              user: user[0],
              isStudent: session.isStudent
            }
            res.send(data);
          }
        });
      // res.json(user);
    }
  })
});




router.route('/getStudent/:id').get((req, res) => {
  console.log(req.params.id);
  sql.query("SELECT * FROM students WHERE id = ?", [req.params.id], function(err, student){
    if(err){
      console.log(err);
    }
    else{
      console.log("Student: ", JSON.stringify(student));
      res.end(JSON.stringify(student));
    }
  });
});

router.route('/get-all-students').get((req,res) =>{
  sql.query("SELECT * FROM students",  (error,students) => {
    if(error){
      console.log(error);
      res.json(error);
    } else {
      console.log("All Students : ",JSON.stringify(students));
      res.end(JSON.stringify(students));
    }
  })
});

router.route('/search').post((req,res) => {
  console.log(req.body);
  sql.query("SELECT * FROM students WHERE name LIKE ? OR collegeName LIKE ? OR skillset LIKE ?", ['%'+req.body.search+'%', '%'+req.body.search+'%', '%'+req.body.search+'%'], 
            function(err, students) 
  {
     if (err)
     {
         res.send(err);
     }
     console.log("Students : ",JSON.stringify(students));
     res.end(JSON.stringify(students));
 
  });
});

router.route('/filterMajor').post((req,res) => {
  console.log(req.body);
  sql.query("SELECT * FROM students,education WHERE (name LIKE ? OR students.collegeName LIKE ? OR skillset LIKE ?) AND education.student = students.id AND education.major LIKE ? GROUP BY students.id ", 
  ['%'+req.body.search+'%', '%'+req.body.search+'%', '%'+req.body.search+'%', '%'+req.body.major+'%'], 
            function(err, students) 
  {
     if (err)
     {
         res.send(err);
     }
     console.log("Students : ",JSON.stringify(students));
     res.end(JSON.stringify(students));
 
  });
});



router.route('/searchJobs').post((req,res) => {
  console.log(req.body);
  sql.query("SELECT j.id AS jobID, j.title, j.created, j.deadline, j.loc, j. salary, j.description, j.cat, c.id, c.name FROM jobs AS j INNER JOIN companies AS c ON j.company = c.id WHERE (j.title LIKE ? OR c.name LIKE ?) AND j.loc LIKE ?",
   ['%'+req.body.search+'%', '%'+req.body.search+'%', '%'+req.body.loc+'%'],
    function(err, jobs){
      if(err){
        console.log(err);
      } else {
       console.log("Jobs : ",JSON.stringify(jobs));
         res.end(JSON.stringify(jobs));
      }
    }
  )
});

router.route('/update-student-basic').put((req, res, next) => {
  sql.query("UPDATE students SET ? WHERE email = ?",
   [req.body, session.user.email],(error, data) => {
    if (error) {
      console.log(error)
      return next(error);
      
    } else {
      res.json(data)

      console.log(data);
      sql.query("SELECT * FROM students WHERE email = ?", [req.body.email], 
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
    sql.query("UPDATE students SET ? WHERE email = ?",
      [images[0], session.user.email],(error, data) => {
    if (error) {
      console.log(error)
      console.log('hello2');
      return next(error);

    } else {

        // res.json(data);
        // session.user = data;
        sql.query("SELECT * FROM students WHERE email = ?", [session.user.email], 
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


  router.route('/education').get((req, res, next) => {
    console.log(session.user.id);
    sql.query("SELECT * FROM education WHERE student = ?", [session.user.id],(error,education) => {
      if(error){
        console.log(error);
        res.json(error);
      } else {
        console.log("Education : ",JSON.stringify(education));
        res.end(JSON.stringify(education));
      }
    })
  
    })


    router.route('/add-education').post((req, res) => {
      req.body.student = session.user.id;
    
      console.log(req.body);
      sql.query("INSERT INTO education SET ?", req.body,(error, data) => {
        console.log("hello");
        if (error) {
          console.log(error);
          res.json(error)
        } else {
          console.log("created");
          console.log(data)
          res.json("Added education");
        }
      })
    });

    router.route('/educationBlind/:id').get((req, res, next) => {
      console.log(req.params.id);
      console.log("hello from ed blinc");
      sql.query("SELECT * FROM education WHERE student = ?", [req.params.id],(error,education) => {
        if(error){
          console.log("hello from ed blink eroor");
          console.log(error);
          res.json(error);
        } else {
          console.log("hello from ed blink success");
          console.log("Education : ",JSON.stringify(education));
          res.end(JSON.stringify(education));
        }
      })
    
      })
  


    router.route('/experience').get((req, res, next) => {
      console.log(session.user.id);
      sql.query("SELECT * FROM experience WHERE student = ?", [session.user.id],(error,experience) => {
        if(error){
          console.log(error);
          res.json(error);
        } else {
          console.log("Experience : ",JSON.stringify(experience));
          res.end(JSON.stringify(experience));
        }
      })
    
      })

      router.route('/experienceBlind/:id').get((req, res, next) => {
        console.log(req.params.id);
        console.log("hello from ex blind");
        sql.query("SELECT * FROM experience WHERE student = ?", [req.params.id],(error,experience) => {
          if(error){
            console.log("hello from ex blind error");
            console.log(error);
            res.json(error);
          } else {
            console.log("Experience : ",JSON.stringify(experience));
            res.end(JSON.stringify(experience));
          }
        })
      
        })
  
  
      router.route('/add-experience').post((req, res) => {
        req.body.student = session.user.id;
      
        console.log(req.body);
        sql.query("INSERT INTO experience SET ?", req.body,(error, data) => {
          console.log("hello");
          if (error) {
            console.log(error);
            res.json(error)
          } else {
            console.log("created");
            console.log(data)
            res.json("Added experience");
          }
        })
      });



      router.route('/update-skillset').put((req, res, next) => {
        sql.query("UPDATE students SET ? WHERE email = ?",
         [req.body, session.user.email],(error, data) => {
          if (error) {
            console.log(error)
            return next(error);
            
          } else {
            res.json(data)
      
            console.log(data);
            sql.query("SELECT * FROM students WHERE email = ?", [session.user.email], 
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

      router.route('/profPicBlind/:id').get((req, res, next) => {
        console.log(UPLOAD_PATH);
        console.log("hello from prof pic");
        console.log(req.params.id);
        sql.query("SELECT * FROM students WHERE id = ?", [req.params.id], (err, student) => {
          if(err){
            console.log(err);
          } else {
            if(student[0].profPicFile){
             fs.createReadStream(path.resolve(UPLOAD_PATH, student[0].profPicFile)).pipe(res);
            } else {
              console.log("we good");
            }
          
            }
        });
        
      
        })


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

    router.route('/jobsApplied').get((req, res, next) => {
      sql.query("SELECT jobs.title, companies.name, applications.created, applications.status FROM applications, jobs, companies WHERE applications.job = jobs.id AND jobs.company = companies.id AND applications.student =?", 
        [session.user.id],(error,applications) => {
          if(error){
            console.log(error);
            res.json(error);
          } else {
            console.log("Applications : ",JSON.stringify(applications));
            res.end(JSON.stringify(applications));
          }
        })
      })
              
            
      router.route('/get-upcoming-events').get((req,res) =>{
        sql.query("SELECT events.id, events.name, events.eligibility, events.loc, events.date, events.time, events.description, companies.name AS companyName FROM events, companies WHERE date > ? AND events.company = companies.id ORDER BY date", 
        [moment(Date.now()).format('YYYY-MM-DD')], (error,events) => {
          if(error){
            console.log(error);
            res.json(error);
          } else {
            console.log("Events : ",JSON.stringify(events));
            res.end(JSON.stringify(events));
          }
        })
      });

      router.route('/search-upcoming-events').post((req,res) =>{
        sql.query("SELECT events.id, events.name, events.eligibility, events.loc, events.date, events.time, events.description, companies.name AS companyName FROM events, companies WHERE date > ? AND events.name LIKE ? AND events.company = companies.id ORDER BY date", 
        [moment(Date.now()).format('YYYY-MM-DD'), '%'+req.body.search+'%'], (error,events) => {
          if(error){
            console.log(error);
            res.json(error);
          } else {
            console.log("Events : ",JSON.stringify(events));
            res.end(JSON.stringify(events));
          }
        })
      });

      router.route('/get-event').post((req,res) =>{
        console.log('')
        sql.query("SELECT * FROM events WHERE id = ?", 
        [req.body.id], (error,event) => {
          if(error){
            console.log(error);
            res.json(error);
          } else {
            console.log("Event : ",JSON.stringify(event));
            res.end(JSON.stringify(event));
          }
        })
      });

      router.route('/registerEvent').post((req,res) =>{
        console.log(req.body)
        req.body.student = session.user.id
        sql.query("INSERT INTO registered_student_event SET ?", req.body, (error,reg) => {
          if(error){
            console.log(error);
            res.json(error);
          } else {
            
            res.json(reg);
          }
        })
      });
      
      router.route('/get-registered-events').get((req,res) =>{
        sql.query("SELECT events.id, events.name, events.eligibility, events.loc, events.date, events.time, events.description, companies.name AS companyName FROM registered_student_event, events, companies WHERE registered_student_event.student = ? AND registered_student_event.event = events.id AND events.company = companies.id", 
        [session.user.id], (error,regs) => {
          if(error){
            console.log(error);
            res.json(error);
          } else {
            
            console.log("Regs : ",JSON.stringify(regs));
            res.end(JSON.stringify(regs));
          }
        })
      });
module.exports = router;