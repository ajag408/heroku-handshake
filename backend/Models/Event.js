const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventSchema = new Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },  

  name: {
    type: String
  },
  description: {
    type: String
  },
  time: {
    type: String,
  },
  date: {
    type: String,
  },
  loc: {
    type: String
  },
  eligibility: {
    type: String
  },

}, {
    collection: 'events'
  })

module.exports = mongoose.model('Event', eventSchema)