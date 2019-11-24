// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// -------- ACCOUNT --------- // 

const Account = mongoose.model('Account', new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  user_profile: { type: Schema.Types.ObjectId, ref: 'Student' },
  tutor_profile: { type: Schema.Types.ObjectId, ref: 'Tutor' },
}), 'accounts'
);

// -------- PROFILE --------- // 

// these properties are shared with our schemas Tutor and User
const Profile = mongoose.model('Profile', new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  account: { type: Schema.Types.ObjectId, ref: 'Account' },
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
    required: true
  },
  program_of_study: {
    type: String
  },
  todos: [
    {
      text: { type: String },
      checked: { type: Boolean }
    }
  ]
}), 'profiles'
);


// -------- TUTOR --------- // 

const TutorSchema = mongoose.Schema({
  subjects: [String],
  picture: {
    type: String,
    required: true
  },
  students: [
    { type: Schema.Types.ObjectId, ref: 'Student' }
  ],
  description: String,
  courses: [
    {
      students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
      }],
      course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
      },
    }
  ]
});

var Tutor = Profile.discriminator('Tutor', TutorSchema, "tutor");

// -------- STUDENT --------- // 

const StudentSchema = mongoose.Schema({
  education_level: {
    type: String,
    required: true
  },
  tutors: [
    { type: Schema.Types.ObjectId, ref: 'Tutor' }
  ],
  courses: [
    {
      tutor: {
        type: Schema.Types.ObjectId,
        ref: 'Tutor'
      },
      course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
      },
    }
  ]
});

var Student = Profile.discriminator('Student', StudentSchema, "student");

// -------- APPOINTMENT --------- // 

var Appointment = mongoose.model('Appointment', new Schema({
  id: {
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


// -------- COURSE --------- // 

var Course = mongoose.model('Course', new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  tutors: [
    { type: Schema.Types.ObjectId, ref: 'Tutor' }
  ],
  students: [
    { type: Schema.Types.ObjectId, ref: 'Student' }
  ]
}), "courses");

// -------- FILES --------- // 

var Files = mongoose.model('Files', new Schema({
  name: {
    type: String,
    required: true
  },
  adminTutor: {
    type: Schema.Types.ObjectId, 
    ref: 'Tutor', 
    required: true
  },
  relatedCourse: [
    { 
      type: Schema.Types.ObjectId, 
      ref: 'Course'
    }
  ],
  sharedToStudents: [
    { type: Schema.Types.ObjectId, ref: 'Student' }
  ]
}), "files");


// export the Schemas
module.exports = {
  Tutor: Tutor,
  Profile: Profile,
  Student: Student,
  Account: Account,
  Appointment: Appointment,
  Course: Course,
  Files: Files
}
