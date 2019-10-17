// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  id: Number,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

var Account = mongoose.model('Account', AccountSchema, "accounts");

const TutorSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
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
});

var  Tutor = Account.discriminator('Tutor', TutorSchema, "tutor");

const UserSchema = new Schema({
    id: Number,
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
});

var User = Account.discriminator('User', UserSchema, "user");

const AppointmentSchema = new Schema({
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
});

var Appointment = mongoose.model('Appointment', AppointmentSchema, "appointments");

// export the Schemas
module.exports = {
  Tutor: Tutor,
  User: User,
  Account: Account,
  Appointment: Appointment,
}
