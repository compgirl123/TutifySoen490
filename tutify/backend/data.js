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
  subject: {
    type: String,
    required: true
  }
});

model.exports = mongoose.model('Tutor', TutorSchema);

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

model.exports = mongoose.model('User', UserSchema);

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

model.exports = mongoose.model('Account', AccountSchema);

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

model.exports = mongoose.model('Appointment', AppointmentSchema);


// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);
