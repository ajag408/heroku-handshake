let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// company Model
let companySchema = require('../models/Company');

// CREATE company
router.route('/create-company').post((req, res, next) => {
    companySchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
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