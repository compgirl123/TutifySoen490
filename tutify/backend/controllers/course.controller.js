const Course = require('../models/models').Course;
const Tutor = require('../models/models').Tutor;

// this method fetches all available courses in our database
exports.getCourses = async function (req, res) {
  Course.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
};

exports.addCourseToDb = async function (req, res) {
  const { name, description, educationLevel, tutor} = req.body;
  
  let course = new Course();
  
  //create course
  course.name = name;
  course.description = description;
  course.educationLevel = educationLevel;
  course.tutors = tutor;
  
  course.save(function (err, course) {

    if (err) return res.json({ success: false, error: err });
    let newCourse = {
      students: [],
      course: course._id,
  }
    Tutor.findByIdAndUpdate(tutor,
      { "$push": { "courses": newCourse } },
      { "new": true, "upsert": true },
      function (err, tutor) {
        if (err) throw err;

    return res.json({ success: true, course: course });
    });

  });
};
