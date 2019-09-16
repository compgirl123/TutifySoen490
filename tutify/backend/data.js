// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Tutor = mongoose.model('Tutor', TutorSchema);
var User = mongoose.model('User', UserSchema);
var Account = mongoose.model('Account', AccountSchema);
var Appointment = mongoose.model('Appointment', AppointmentSchema);

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
  subject: {
    type: String,
    required: true
  }
});

const UserSchema = new Schema({
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
    education: {
      type: String,
      required: true
    },
    school: {
      type: String,
      required: true
    }

});

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

// this is used temporarily for testing
const DataSchema = new Schema(
  {
    id: Number,
    message: String
  },
  { timestamps: true },
);

// export the new Schema so we could modify it using Node.js
module.exports = {
  Tutor: Tutor,
  User: User,
  Account: Account,
  Appointment: Appointment,
  Data: Data
}
