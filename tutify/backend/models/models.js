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
  notifications: [
    {
      title: { type: String },
      text: { type: String },
      tutorImg: { type: String },
      tutorName: { type: String },
      tutorid: { type: Schema.Types.ObjectId, ref: 'Tutor' }
    }
  ],
  todos: [
    {
      id: { type: String },
      title: { type: String },
      completed: { type: Boolean }
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
  ],
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event'

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
  url: {
    type: String,
    required: true
  },
  fileObject: {type: Schema.Types.ObjectId, 
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

// -------- UploadedFiles --------- // 

var UploadedFiles = mongoose.model('UploadedFiles', new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  encryptedname:{
    type: String,
    required: true
  },
  adminTutor: {
    type: Schema.Types.ObjectId,
    ref: 'Tutor',
    required: true
  },
  uploadedDocs: [
    { type: Schema.Types.ObjectId, ref: 'Mfiles' }
  ],
  sharedToStudents: [{
    type: String,
    required: true
  }
    //{ type: Schema.Types.ObjectId, ref: 'Student' }
    // for testing purposes only temporary.
    // Kasthurie: implement option for tutor to share stuff.
  ],
  sharedToCourses: [{
    type: String,
    required: true
  }
    //{ type: Schema.Types.ObjectId, ref: 'Student' }
    // for testing purposes only temporary.
    // Kasthurie: implement option for tutor to share stuff.
  ]
}), "uploaded_files");


// --------  Event --------- // 

var Event = mongoose.model('Event', new Schema({
  description: String,
  location: String,
  date: String,
  startTime: String,
  endTime: String
}), "events");

// --------  Multer files --------- // 
var Mfiles = mongoose.model('Mfiles', new Schema({
  length:  Number,
  chunkSize: Number,
  uploadDate: Date,
  md5: Schema.Types.Mixed,
  filename: String,
  contentType: String,
  aliases: [{type: String}],
  metadata: Schema.Types.Mixed
}), "uploads.files");
var Mchunks = mongoose.model('Mchunks', new Schema({   
     files_id : {type:Schema.Types.ObjectId, ref: 'uploads.files'},    
     n : Number,    
     data : Schema.Types.Buffer
}), "uploads.chunks");


// export the Schemas
module.exports = {
  Tutor: Tutor,
  Profile: Profile,
  Student: Student,
  Account: Account,
  Appointment: Appointment,
  Course: Course,
  UploadedFiles: UploadedFiles,
  Files: Files,
  Event: Event,
  Mfiles: Mfiles,
  Mchunks: Mchunks
}


