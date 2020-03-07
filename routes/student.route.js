
const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
const multer = require('multer');
const path = require('path');

const UPLOAD_PATH = path.resolve(__dirname, 'path/to/uploadedFiles');
const upload = multer({
  dest: UPLOAD_PATH,
  limits: { files: 5 },
});

const fs = require('fs');
const sql = require('../database/sqldb');
// Student Model

const BCRYPT_SALT_ROUNDS = 12;
// CREATE Student
router.route('/create-student').post((req, res, next) => {
  bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
    .then((hashedPass) => {
      req.body.password = hashedPass;
      sql.query('INSERT INTO students SET ?', req.body, (error, data) => {
        if (error) {
          res.json(error);
        } else {
          console.log(data);
          res.json(data);
        }
      });
    })
    .catch((error) => {
      console.log('Error saving student: ');
      console.log(error);
      next();
    });
});

router.route('/user').get((req, res) => {
  const { user } = session;
  // console.log(session.user);
  const data = {
    user,
    isStudent: session.isStudent,
  };
  res.json(data);
});

router.route('/logout').get((req, res) => {
  console.log('route hit');
  session.user = undefined;
  session.isStudent = false;
  res.json('done');
});


router.route('/login').post((req, res) => {
  sql.query('SELECT * FROM students WHERE email = ?', [req.body.email], (error, user) => {
    if (error) {
      console.log(error);
      res.json(error);
    } else if (user[0] == null) {
      res.json('No user with that email');
    } else {
      bcrypt.compare(req.body.password, user[0].password)
        .then((samePassword) => {
          if (!samePassword) {
            res.json('Password invalid');
          } else {
            [session.user] = user;
            session.isStudent = true;
            const data = {
              user: user[0],
              isStudent: session.isStudent,
            };
            res.send(data);
          }
        });
      // res.json(user);
    }
  });
});


router.route('/getStudent/:id').get((req, res) => {
  console.log(req.params.id);
  sql.query('SELECT * FROM students WHERE id = ?', [req.params.id], (err, student) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Student: ', JSON.stringify(student));
      res.end(JSON.stringify(student));
    }
  });
});

router.route('/get-all-students').get((req, res) => {
  sql.query('SELECT * FROM students', (error, students) => {
    if (error) {
      console.log(error);
      res.json(error);
    } else {
      console.log('All Students : ', JSON.stringify(students));
      res.end(JSON.stringify(students));
    }
  });
});

router.route('/search').post((req, res) => {
  console.log(req.body);
  sql.query('SELECT * FROM students WHERE name LIKE ? OR collegeName LIKE ? OR skillset LIKE ?', [`%${req.body.search}%`, `%${req.body.search}%`, `%${req.body.search}%`],
    (err, students) => {
      if (err) {
        res.send(err);
      }
      console.log('Students : ', JSON.stringify(students));
      res.end(JSON.stringify(students));
    });
});

router.route('/filterMajor').post((req, res) => {
  console.log(req.body);
  sql.query('SELECT * FROM students,education WHERE (name LIKE ? OR students.collegeName LIKE ? OR skillset LIKE ?) AND education.student = students.id AND education.major LIKE ? GROUP BY students.id ',
    [`%${req.body.search}%`, `%${req.body.search}%`, `%${req.body.search}%`, `%${req.body.major}%`],
    (err, students) => {
      if (err) {
        res.send(err);
      }
      console.log('Students : ', JSON.stringify(students));
      res.end(JSON.stringify(students));
    });
});


router.route('/update-student-basic').put((req, res, next) => {
  sql.query('UPDATE students SET ? WHERE email = ?',
    [req.body, session.user.email], (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      }
      res.json(data);

      console.log(data);
      sql.query('SELECT * FROM students WHERE email = ?', [req.body.email],
        (err, user) => {
          if (err) {
            console.log(err);
          } else {
            [session.user] = user;
          }
        });
      console.log('Student updated successfully !');
      return 0;
    });
});

router.route('/profPic').post(upload.array('image', 5), (req, res, next) => {
  const images = req.files.map((file) => ({
    profPicFile: file.filename,
    profPicOG: file.originalname,
  }));
  console.log(images);
  if (!images[0].profPicOG.match(/\.(gif|jpg|jpeg|tiff|png)$/i)) {
    res.json('Not an image');
  } else {
    console.log(session.user.email);
    sql.query('UPDATE students SET ? WHERE email = ?',
      [images[0], session.user.email], (error) => {
        if (error) {
          console.log(error);
          console.log('hello2');
          return next(error);
        }
        // res.json(data);
        // session.user = data;
        sql.query('SELECT * FROM students WHERE email = ?', [session.user.email],
          (err, user) => {
            if (err) {
              console.log(err);
            } else {
              [session.user] = user;
            }
          });
        res.json('Picture uploaded successfully !');
        return 0;
      });
  }
});


router.route('/profPic/').get((req, res) => {
  console.log(UPLOAD_PATH);
  console.log(session.user);
  fs.createReadStream(path.resolve(UPLOAD_PATH, session.user.profPicFile)).pipe(res);
});


router.route('/education').get((req, res) => {
  console.log(session.user.id);
  sql.query('SELECT * FROM education WHERE student = ?', [session.user.id], (error, education) => {
    if (error) {
      console.log(error);
      res.json(error);
    } else {
      console.log('Education : ', JSON.stringify(education));
      res.end(JSON.stringify(education));
    }
  });
});


router.route('/add-education').post((req, res) => {
  req.body.student = session.user.id;

  console.log(req.body);
  sql.query('INSERT INTO education SET ?', req.body, (error, data) => {
    console.log('hello');
    if (error) {
      console.log(error);
      res.json(error);
    } else {
      console.log('created');
      console.log(data);
      res.json('Added education');
    }
  });
});

router.route('/educationBlind/:id').get((req, res) => {
  console.log(req.params.id);
  console.log('hello from ed blinc');
  sql.query('SELECT * FROM education WHERE student = ?', [req.params.id], (error, education) => {
    if (error) {
      console.log('hello from ed blink eroor');
      console.log(error);
      res.json(error);
    } else {
      console.log('hello from ed blink success');
      console.log('Education : ', JSON.stringify(education));
      res.end(JSON.stringify(education));
    }
  });
});


router.route('/experience').get((req, res) => {
  console.log(session.user.id);
  sql.query('SELECT * FROM experience WHERE student = ?', [session.user.id], (error, experience) => {
    if (error) {
      console.log(error);
      res.json(error);
    } else {
      console.log('Experience : ', JSON.stringify(experience));
      res.end(JSON.stringify(experience));
    }
  });
});

router.route('/experienceBlind/:id').get((req, res) => {
  console.log(req.params.id);
  console.log('hello from ex blind');
  sql.query('SELECT * FROM experience WHERE student = ?', [req.params.id], (error, experience) => {
    if (error) {
      console.log('hello from ex blind error');
      console.log(error);
      res.json(error);
    } else {
      console.log('Experience : ', JSON.stringify(experience));
      res.end(JSON.stringify(experience));
    }
  });
});


router.route('/add-experience').post((req, res) => {
  req.body.student = session.user.id;

  console.log(req.body);
  sql.query('INSERT INTO experience SET ?', req.body, (error, data) => {
    console.log('hello');
    if (error) {
      console.log(error);
      res.json(error);
    } else {
      console.log('created');
      console.log(data);
      res.json('Added experience');
    }
  });
});


router.route('/update-skillset').put((req, res, next) => {
  sql.query('UPDATE students SET ? WHERE email = ?',
    [req.body, session.user.email], (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      }
      res.json(data);

      console.log(data);
      sql.query('SELECT * FROM students WHERE email = ?', [session.user.email],
        (err, user) => {
          if (err) {
            console.log(err);
          } else {
            [session.user] = user;
          }
        });
      console.log('Company updated successfully !');
      return 0;
    });
});

router.route('/profPicBlind/:id').get((req, res) => {
  console.log(UPLOAD_PATH);
  console.log('hello from prof pic');
  console.log(req.params.id);
  sql.query('SELECT * FROM students WHERE id = ?', [req.params.id], (err, student) => {
    if (err) {
      console.log(err);
    } else if (student[0].profPicFile) {
      fs.createReadStream(path.resolve(UPLOAD_PATH, student[0].profPicFile)).pipe(res);
    } else {
      console.log('we good');
    }
  });
});


module.exports = router;
