const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('Job', jobSchema)