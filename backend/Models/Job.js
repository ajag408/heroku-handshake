const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// let Company = require('../models/Company');

let jobSchema = new Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  title: {
    type: String
  },
  created: {
    type: String,
  },
  deadline: {
    type: String,
  },
  loc: {
    type: String
  },
  salary: {
    type: String
  },
  description: {
    type: String
  },
  cat: {
    type: String
  }
}, {
    collection: 'jobs'
  })


  // jobSchema.statics.search = function (, callback) {
  //   var query = this.findOne()
  
  //   Person.findOne({'firstname': username}, function (error, person) {
  //     query.where(
  //       {person1: person._id}
  //     ).exec(callback);
  //   })
  //   return query
  // }
  
module.exports = mongoose.model('Job', jobSchema)