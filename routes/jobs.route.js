const express = require('express');

const router = express.Router();
const session = require('express-session');
const sql = require('../database/sqldb');


router.route('/create-job').post((req, res) => {
  req.body.company = session.user.id;
  console.log();
  console.log(req.body);
  sql.query('INSERT INTO jobs SET ?', req.body, (error, data) => {
    if (error) {
      console.log(error);
      res.json(error);
    } else {
      console.log('created');
      console.log(data);
      res.json('Added job');
    }
  });
});


router.route('/get-jobs').get((req, res) => {
  sql.query('SELECT * FROM jobs WHERE company = ?',
    [session.user.id], (error, jobs) => {
      if (error) {
        console.log(error);
        res.json(error);
      } else {
        console.log('Jobs : ', JSON.stringify(jobs));
        res.end(JSON.stringify(jobs));
      }
    });
});

router.route('/searchJobs').post((req, res) => {
  console.log(req.body);
  sql.query('SELECT j.id AS jobID, j.title, j.created, j.deadline, j.loc, j. salary, j.description, j.cat, c.id, c.name FROM jobs AS j INNER JOIN companies AS c ON j.company = c.id WHERE (j.title LIKE ? OR c.name LIKE ?) AND j.loc LIKE ?',
    [`%${req.body.search}%`, `%${req.body.search}%`, `%${req.body.loc}%`],
    (err, jobs) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Jobs : ', JSON.stringify(jobs));
        res.end(JSON.stringify(jobs));
      }
    });
});

router.route('/jobsApplied').get((req, res) => {
  sql.query('SELECT jobs.title, companies.name, applications.created, applications.status FROM applications, jobs, companies WHERE applications.job = jobs.id AND jobs.company = companies.id AND applications.student =?',
    [session.user.id], (error, applications) => {
      if (error) {
        console.log(error);
        res.json(error);
      } else {
        console.log('Applications : ', JSON.stringify(applications));
        res.end(JSON.stringify(applications));
      }
    });
});

module.exports = router;
