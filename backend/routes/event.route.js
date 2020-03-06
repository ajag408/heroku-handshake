const express = require('express');

const router = express.Router();
const session = require('express-session');
const moment = require('moment');
const sql = require('../database/sqldb');

router.route('/create-event').post((req, res) => {
  req.body.company = session.user.id;

  console.log(req.body);
  sql.query('INSERT INTO events SET ?', req.body, (error, data) => {
    console.log('hello');
    if (error) {
      console.log(error);
      res.json(error);
    } else {
      console.log('created');
      console.log(data);
      res.json('Added event');
    }
  });
});

router.route('/get-events').get((req, res) => {
  sql.query('SELECT * FROM events WHERE company = ?', [session.user.id], (error, events) => {
    if (error) {
      console.log(error);
      res.json(error);
    } else {
      console.log('Events : ', JSON.stringify(events));
      res.end(JSON.stringify(events));
    }
  });
});


router.route('/get-registered-students').post((req, res) => {
  console.log(req.body);
  sql.query('SELECT students.name, students.id FROM registered_student_event, students WHERE registered_student_event.event = ? AND registered_student_event.student = students.id',
    [req.body.id], (error, students) => {
      if (error) {
        console.log(error);
        res.json(error);
      } else {
        console.log('Registered students : ', JSON.stringify(students));
        res.end(JSON.stringify(students));
      }
    });
});


router.route('/get-upcoming-events').get((req, res) => {
  sql.query('SELECT events.id, events.name, events.eligibility, events.loc, events.date, events.time, events.description, companies.name AS companyName FROM events, companies WHERE date > ? AND events.company = companies.id ORDER BY date',
    [moment(Date.now()).format('YYYY-MM-DD')], (error, events) => {
      if (error) {
        console.log(error);
        res.json(error);
      } else {
        console.log('Events : ', JSON.stringify(events));
        res.end(JSON.stringify(events));
      }
    });
});

router.route('/search-upcoming-events').post((req, res) => {
  sql.query('SELECT events.id, events.name, events.eligibility, events.loc, events.date, events.time, events.description, companies.name AS companyName FROM events, companies WHERE date > ? AND events.name LIKE ? AND events.company = companies.id ORDER BY date',
    [moment(Date.now()).format('YYYY-MM-DD'), `%${req.body.search}%`], (error, events) => {
      if (error) {
        console.log(error);
        res.json(error);
      } else {
        console.log('Events : ', JSON.stringify(events));
        res.end(JSON.stringify(events));
      }
    });
});

router.route('/get-event').post((req, res) => {
  console.log('');
  sql.query('SELECT * FROM events WHERE id = ?',
    [req.body.id], (error, event) => {
      if (error) {
        console.log(error);
        res.json(error);
      } else {
        console.log('Event : ', JSON.stringify(event));
        res.end(JSON.stringify(event));
      }
    });
});

router.route('/registerEvent').post((req, res) => {
  console.log(req.body);
  req.body.student = session.user.id;
  sql.query('INSERT INTO registered_student_event SET ?', req.body, (error, reg) => {
    if (error) {
      console.log(error);
      res.json(error);
    } else {
      res.json(reg);
    }
  });
});

router.route('/get-registered-events').get((req, res) => {
  sql.query('SELECT events.id, events.name, events.eligibility, events.loc, events.date, events.time, events.description, companies.name AS companyName FROM registered_student_event, events, companies WHERE registered_student_event.student = ? AND registered_student_event.event = events.id AND events.company = companies.id',
    [session.user.id], (error, regs) => {
      if (error) {
        console.log(error);
        res.json(error);
      } else {
        console.log('Regs : ', JSON.stringify(regs));
        res.end(JSON.stringify(regs));
      }
    });
});

module.exports = router;
