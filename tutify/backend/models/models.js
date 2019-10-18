// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// -------- ACCOUNT --------- // 

// these properties are shared with our schemas Tutor and User
const Account = mongoose.model('Account', new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  user_profile: {type: Schema.Types.ObjectId, ref: 'User'},
  tutor_profile: {type: Schema.Types.ObjectId, ref: 'Tutor'},
}), 'accounts'
);

// -------- TUTOR --------- // 

const Tutor = mongoose.model('Tutor', new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  account: {type: Schema.Types.ObjectId, ref: 'Account'},
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true,
  },
  program: {
    type: String,
  },
  subject: [String],
  picture:{
    type:String,
    required:true
  },
  students:[
    {type: Schema.Types.ObjectId, ref: 'User'}
  ]
}),'tutors'
);

// -------- USER --------- // 

const User = mongoose.model('User', new mongoose.Schema({
  id: Number,
  account: {type: Schema.Types.ObjectId, ref: 'Account'},
  first_name: {
    type: String,
    required: true
  },
  last_name : {
    type: String,
    required: true
  },
  program_of_study : {
    type: String,
    required: true
  },
  education_level : {
    type: String,
    required: true
  },
  school : {
    type: String,
    required: true
  },
  tutors:[
    {type: Schema.Types.ObjectId, ref: 'Tutor'}
  ]
}),'users'
);

// -------- APPOINTMENT --------- // 

var Appointment = mongoose.model('Appointment', new Schema({
  id: {
    type: Number,
    required: true
  },
  tutor_id: {
    type: Schema.Types.ObjectId,
    ref: 'Tutor',
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String
  }
}), "appointments");

// export the Schemas
module.exports = {
  Tutor: Tutor,
  User: User,
  Account: Account,
  Appointment: Appointment,
}
