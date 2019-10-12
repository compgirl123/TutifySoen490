// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  }

});

var Tutor = mongoose.model('Tutor', TutorSchema, "tutors");

const UserSchema = new Schema(//{
    {
      id: Number,
      first_name: String,
      last_name : String,
      program_of_study : String,
      email : String,
      password: String,
      education_level : String,
      school : String,
      school_name_other : String
      //classes_tutored : String,
      //type_tutoring : String
    }
    /*id: {
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
    education: {
      type: String,
      required: true
    },
    school: {
      type: String,
      required: true
    }*/

/*}*/);

var User = mongoose.model('User', UserSchema, "users");

const AccountSchema = new Schema({
    id: {
      type: Number,
      required: true
    },
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

const AppointmentSchema = new Schema({
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
  //Is this necessary? Since mongodb isn't relational db, i don't think this is needed
  id: {
    type: Number,
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

// this is used temporarily for testing
const DataSchema = new Schema(
  {
    id: Number,
    name: String
  },
  { timestamps: true },
);

var Data = mongoose.model('Data', DataSchema, "datas");

// export the Schemas
module.exports = {
  Tutor: Tutor,
  User: User,
  Account: Account,
  Appointment: Appointment,
  Data: Data
}
