const Course = require('../models/models').Course;
const Tutor = require('../models/models').Tutor;

// this method fetches all available courses in our database
exports.getCourses = async function (req, res) {
  Course.find((err, data) => {
    if (err) {
      console.error("The courses were not found");
      return res.json({ success: false, error: err });
    }
    console.info("The courses were found");
    return res.json({ success: true, data: data });
  });
};

// this method adds a tutor to an existing course
exports.addTutorToCourse = async function (req, res) {
  const { course_id, tutor } = req.body;

  Course.findByIdAndUpdate(course_id,
    { "$push": { "tutors": tutor } },
    { "new": true, "upsert": true },
    function (err, course) {
      if (err) {
        console.error("The tutor couldn't get added to the course due to not finding the course");
        return res.json({ success: false, error: err });
      }
      let newCourse = {
        students: [],
        course: course._id,
      }
      Tutor.findByIdAndUpdate(tutor,
        { "$push": { "courses": newCourse } },
        { "new": true, "upsert": true },
        function (err, tutor) {
          if (err) {
            console.error("The tutor couldn't get added to the course due to not finding the tutor");
            throw err;
          }

          console.info("The tutor was successfully added to the course");
          return res.json({ success: true, course: course });
        });
    });
};

// this method adds a course to the database
exports.addCourseToDb = async function (req, res) {
  const { name, description, educationLevel, tutor } = req.body;

  let course = new Course();

  //create course
  course.name = name;
  course.description = description;
  course.educationLevel = educationLevel;
  course.tutors = tutor;

  course.save(function (err, course) {

    if (err) {
      console.error("The course couldn't get added to the database (API request failed)");
      return res.json({ success: false, error: err });
    }
    let newCourse = {
      students: [],
      course: course._id,
    }
    Tutor.findByIdAndUpdate(tutor,
      { "$push": { "courses": newCourse } },
      { "new": true, "upsert": true },
      function (err, tutor) {
        if (err) {
          console.error("The course couldn't get added as the course's tutor was not found");
          throw err;
        }
        console.info("The course was successfully added to the database");
        return res.json({ success: true, course: course });
      });

  });
};

//delete a course from the database
exports.deleteCourse = async function (req, res) {
  const { course, tutor_id } = req.body;

//delete courses from tutor 

//

/** 
  Course.findByIdAndRemove(course_id, (err, event) => {
      if (err) {
          console.error("The course could not be removed (not found)");
          return res.send(err);
      }
      Tutor.findByIdAndUpdate(tutor_id,
          { "$pull": { "courses": course } },
          function (err, tutor) {
              
    */          
              course.students.forEach(function (student) {
                  Student.findByIdAndUpdate(student,
                    { "$pull": { "courses": {course: course.course, tutor : tutor_id }}}, 
                    
                     
                      function (err, student) {
                          if (err) throw err;
                      });
              });
              /** 
              console.info("The event was deleted successfully");
              req.session.userInfo.events = tutor.events;
              req.session.save(function (err) {
                  if (err) {
                      console.error("The session was unable to be saved");
                      return res.json({ success: false, error: err });
                  }
                  console.info("The session was able to be saved");
                  req.session.reload(function (err) {
                      if (err) {
                          console.warn("The session failed to reload");
                      }
                      else{
                          console.info("The session reloaded successfully");
                      }
                      return res.json({ success: true, userInfo: tutor });
                  });
              });
          });
  });
*/
};