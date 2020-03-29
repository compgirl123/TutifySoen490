const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var NumberInt = require('mongoose-int32');

// -------- Account --------- // 

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

// -------- Profile --------- // 

// these properties are shared with our schemas Tutor and User
const Profile = mongoose.model('Profile', new mongoose.Schema({
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
  nbNewNotifications: {
    type: Number,
    required: true,
  },
  notifications: [
    {
      title: { type: String },
      text: { type: String },
      tutorName: { type: String },
      tutorid: { type: Schema.Types.ObjectId, ref: 'Tutor' },
      new: { type: Boolean },
    }
  ],
  todos: [
    {
      id: { type: String },
      title: { type: String },
      completed: { type: Boolean }
    }
  ],
  sharedToStudents:
    [
      { type: Schema.Types.ObjectId, ref: 'UploadedFiles' }
    ],
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event'

    }
  ],
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Number },
}), 'profiles'
);


// -------- Tutor --------- // 

const TutorSchema = mongoose.Schema({
  subjects: [String],
  picture: {
    type: String,
    required: true
  },
  uploadedPicture:
  {
    imgName: { type: String, required: true, default: "none" },
    imgData: { type: String, required: true }
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

// -------- Student --------- // 

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
  ],
  level: Number,
  levelPoints: Number,
  totalPoints: Number,
  badgeDiscriminator: [
    {
      badgeId: {
        type: Schema.Types.ObjectId,
        ref: 'Badges'
      },
      enable: Number
    }
  ]
});

var Student = Profile.discriminator('Student', StudentSchema, "student");

// -------- Appointment --------- // 

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


// -------- Course --------- // 

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
  ],
  sharedToCourses: [{
    type: String,
    required: true
  }],
  educationLevel: String

}), "courses");


// -------- Files --------- // 

var Files = mongoose.model('uploaded_files', new Schema({
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
  fileObject: {
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
}), "uploaded_files");

// -------- UploadedFiles --------- // 

var UploadedFiles = mongoose.model('UploadedFiles', new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  encryptedname: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  uploadedDocs: [
    { type: Schema.Types.ObjectId, ref: 'Mfiles' }
  ],
  sharedToStudents: [
    { type: Schema.Types.ObjectId, ref: 'Student' }
  ],
  sharedToCourses: [
    { type: Schema.Types.ObjectId, ref: 'Course' }
  ],
  sharedToTutors: [
    { type: Schema.Types.ObjectId, ref: 'Tutor' }
  ],

  uploadDate: Date
}), "uploaded_files");


// --------  Event --------- // 

var Event = mongoose.model('Event', new Schema({
  description: String,
  location: String,
  date: String,
  startTime: String,
  endTime: String,
  students: [
    { type: Schema.Types.ObjectId, ref: 'Student' }
  ],
  tutor: { type: Schema.Types.ObjectId, ref: 'Tutor' },
  tutorName: { type: String },
}), "events");

// --------  Multer files --------- // 
var Mfiles = mongoose.model('Mfiles', new Schema({
  length: Number,
  chunkSize: Number,
  uploadDate: Date,
  md5: Schema.Types.Mixed,
  filename: String,
  contentType: String,
  aliases: [{ type: String }],
  metadata: Schema.Types.Mixed
}), "uploads.files");

var Mchunks = mongoose.model('Mchunks', new Schema({
  files_id: { type: Schema.Types.ObjectId, ref: 'uploads.files' },
  n: Number,
  data: Schema.Types.Buffer
}), "uploads.chunks");

// -------- Resource --------- // 

var Resource = mongoose.model('Resource', new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  educationLevel: {
    type: String,
    required: true
  }
}), "resources");

// -------- Videos --------- // 
var Videos = mongoose.model('Videos', new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  videoLink: {
    type: String,
    required: true
  },
  tutorId: {
    type: Schema.Types.ObjectId,
    ref: 'Tutor',
    required: true
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  }
}), "videos");

// -------- Quizzes --------- // 
var Quizzes = mongoose.model('Quizzes', new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question',
  }],
  tutorId: {
    type: Schema.Types.ObjectId,
    ref: 'Tutor',
    required: true
  },
  points: {
    type: NumberInt,
    ref: 'Tutor',
    required: true
  },
  allowed_attempts:{
    type: NumberInt,
    required:true
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  attempts: [{
    type: Schema.Types.ObjectId,
    ref: 'QuizAttempt',
    required: true
  }]
}), "quizzes");

// -------- Questions --------- // 
var Questions = mongoose.model('Questions', new Schema({
  question: {
    type: String,
    required: true
  },
  choices: [{
    type: String,
    required: true
  }],
  answerIndex: {
    type: NumberInt,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'Tutor',
    required: true
  },
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'Quizzes',
    required: true
  }
}), "questions");

// -------- Badges --------- //
var Badges = mongoose.model('Badges', new Schema({
  imageName: String,
  imageData: String,
  description: String,
  badgePoints: Number
}), "badges");


// Answers to the quizzes
var QuizAttempt = mongoose.model('QuizAttempt', new Schema({
  quiz: {
    type: Schema.Types.ObjectId,
    ref: 'Quizzes',
    required: true
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  }
}), "quiz.attempt");

// export the Schemas
module.exports = {
  Tutor: Tutor,
  Profile: Profile,
  Quizzes: Quizzes,
  Questions: Questions,
  Student: Student,
  Account: Account,
  Appointment: Appointment,
  Course: Course,
  UploadedFiles: UploadedFiles,
  Event: Event,
  Mfiles: Mfiles,
  Mchunks: Mchunks,
  Resource: Resource,
  Videos: Videos,
  QuizAttempt: QuizAttempt
}


