
  express = require('express'),
  router = express.Router();
  var bcrypt = require('bcrypt');
  var session = require('express-session');
  var sql = require('../database/sqldb');
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



router.route('/search').post((req,res) => {
  console.log(req.body);
  sql.query("SELECT * FROM students WHERE name LIKE ? OR collegeName LIKE ?", ['%'+req.body.search+'%', '%'+req.body.search+'%'], 
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
  var companyList;
  sql.query("SELECT * FROM jobs INNER JOIN companies ON jobs.company = companies.id WHERE title LIKE ? OR name LIKE ?",
   ['%'+req.body.search+'%', '%'+req.body.search+'%'],
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



module.exports = router;