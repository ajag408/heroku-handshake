let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();
var bcrypt = require('bcrypt');

// company Model
let companySchema = require('../models/Company');

var BCRYPT_SALT_ROUNDS = 12;

// CREATE company
router.route('/create-company').post((req, res, next) => {
    bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
        .then((hashedPass) => {
            req.body.password = hashedPass;
            companySchema.create(req.body, (error, data) => {
                if (error) {
                  res.json(error)
                } else {
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

// READ company
router.route('/').get((req, res) => {
    companySchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single company
router.route('/edit-student/:id').get((req, res) => {
    companySchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update company
router.route('/update-company/:id').put((req, res, next) => {
    companySchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Student updated successfully !')
    }
  })
})

// Delete company
router.route('/delete-student/:id').delete((req, res, next) => {
    companySchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;