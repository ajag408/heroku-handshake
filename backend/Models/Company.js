const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let companySchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  loc: {
    type: String
  }
}, {
    collection: 'companies'
  })

module.exports = mongoose.model('Company', companySchema)