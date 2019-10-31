const Course = require('../models/models').Course;

// this method fetches all available courses in our database
exports.getCourses = async function (req, res) {
    Course.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
};