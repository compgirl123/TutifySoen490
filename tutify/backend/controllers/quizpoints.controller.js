const Quizes = require('../models/models').Quizes;
const Questions = require('../models/models').Questions;
const QuizAttempt = require('../models/models').QuizAttempt;
const Course = require('../models/models').Course;
const Question = require('../models/models').Question;

// this method fetches all available quizes from a tutor in our database
exports.addPoints = async (req, res) => {
    var id = [];
    if (req.session.userInfo.__t == "tutor") {
        id.push(req.session.userInfo._id);
        console.log("HI");
        console.log(id);
    }
    else if (req.session.userInfo.__t == "student") {
        id.push(req.query.tutor);
        console.log("HI");
        console.log(id);
    }
    Quizes.find({ tutorId: { $in: id } }, function (err, quiz) {
        if (err) {
            console.error("The quizes were not found");
            return res.json({ success: false, error: err })
        }
        console.info("The quizes were found");
        return res.json({ success: true, data: quiz });
    });
};

