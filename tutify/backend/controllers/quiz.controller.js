const Quizes = require('../models/models').Quizes;
const Questions = require('../models/models').Questions;
const QuizAttempt = require('../models/models').QuizAttempt;
const Course = require('../models/models').Course;

// this method fetches all available quizes from a tutor in our database
exports.getQuizes = async (req, res) => {
    var id = [];
    if (req.session.userInfo.__t == "tutor") {
        id.push(req.session.userInfo._id);
    }
    else if (req.session.userInfo.__t == "student") {
        id.push(req.query.tutor);
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

// this method select the quizes by course
exports.getCourseQuizes = async (req, res) => {
    var id = [];
    if (req.session.userInfo.__t == "tutor") {
        id.push(req.session.userInfo._id);
    }
    else if (req.session.userInfo.__t == "student") {
        id.push(req.query.tutor);
    }
    await Quizes.find({ tutorId: { $in: id }, course: req.query.tutorClasses[req.query.courseSelected] }, async (err, quiz) => {
        if (err) {
            console.error("The quizes were not found");
            return await res.json({ success: false, error: err })
        }
        console.info("The quizes were found");
        return await res.json({ success: true, data: quiz });
    });

};

// this method adds a new quiz to the database
exports.addQuiz = async function (req, res) {
    const { title, description, questions, tutorId, course } = req.body;
    // new quiz to be added by tutor
    let quizes = new Quizes();
    quizes.title = title;
    quizes.description = description;
    quizes.questions = questions;
    quizes.tutorId = tutorId;
    //quizes.course = course;
    await Course.findOne({ name: course, tutors: { $in: [tutorId] } }, async (err, foundCourse) => {
        quizes.course = foundCourse; 
        quizes.save(function (err, quizes) {
            if (err) {
                console.error(err);
                console.error("The quiz couldn't get added to the database (API request failed)");
                return res.json({ success: false, error: err });
            }
            console.info("The quiz was successfully added to the database");
            return res.json({ success: true, data: quizes });
        });
    });
    /*quizes.save(function (err, quizes) {
        if (err) {
            console.error(err);
            console.error("The quiz couldn't get added to the database (API request failed)");
            return res.json({ success: false, error: err });
        }
        console.info("The quiz was successfully added to the database");
        return res.json({ success: true, data: quizes });
    });*/
};

// this method adds a new attempt and links it to the quiz
exports.addAttempt = async function (req, res) {
    const { score, quiz_id, studentId, answerIndexes } = req.body;
    // new quiz to be added by tutor
    let attempt = new QuizAttempt();
    attempt.score = score;
    attempt.answerIndex = answerIndexes;
    attempt.quiz = quiz_id;
    attempt.student = studentId;
    attempt.save(function (err, attempt) {
        if (err) {
            console.error(err);
            console.error("The attempt couldn't get added to the database (API request failed)");
            return res.json({ success: false, error: err });
        }
        console.info("The attempt was successfully added to the database");
        return res.json({ success: true, data: attempt });
    });
};

// this method adds a new quiz to the database
exports.getAllQuestions = async function (req, res) {
    
   Questions.find({}, async (err, questions) => {
    if (err) {
        console.error("The quizes were not found");
        return await res.json({ success: false, error: err })
    }
    console.info("The quizes were found");
    return await res.json({ success: true, data: questions });
   })
};


// this method adds a new question to the database
exports.addQuestion = async function (req, res) {
    const { question, choices, answerIndex, creator, course } = req.body;
    // new quiz to be added by tutor
    let questions = new Questions();
    questions.question = question;
    questions.choices = choices;
    questions.answerIndex = answerIndex;
    questions.creator = creator;
    questions.course = course;
    await Course.findOne({ name: course, tutors: { $in: [creator] } }, async (err, foundCourse) => {
        questions.course = foundCourse; 
        questions.save(function (err, question) {
            if (err) {
                console.error(err);
                console.error("The question couldn't get added to the database (API request failed)");
                return res.json({ success: false, error: err });
            }
            console.info("The question was successfully added to the database");
            return res.json({ success: true, data: question });
        });
    });
    /*questions.save(function (err, question) {
        if (err) {
            console.error(err);
            console.error("The question couldn't get added to the database (API request failed)");
            return res.json({ success: false, error: err });
        }
        console.info("The question was successfully added to the database");
        return res.json({ success: true, data: question });
    });*/
};

// this method deletes a quiz from the db
exports.deleteQuiz = async function (req, res) {
    const { _id } = req.body;
    // selected quiz to delete by tutor
    Quizes.findByIdAndRemove(_id, (err) => {
        if (err) {
            console.error("The delete order was given, but was not executed by the database. This may be due to a connection error.");
            return res.send(err);
        }
        console.info("The quiz has been deleted");
        return res.json({ success: true });
    });
};

// this method deletes a question from the db
exports.deleteQuestion = async function (req, res) {
    const { _id } = req.body;
    // selected quiz to delete by tutor
    Questions.findByIdAndRemove(_id, (err) => {
        if (err) {
            console.error("The delete order was given, but was not executed by the database. This may be due to a connection error.");
            return res.send(err);
        }
        console.info("The question has been deleted");
        return res.json({ success: true });
    });
};

// this method deletes an attempt from the db
exports.deleteAttempt = async function (req, res) {
    const { _id } = req.body;
    // selected quiz to delete by tutor
    QuizAttempt.findByIdAndRemove(_id, (err) => {
        if (err) {
            console.error("The delete order was given, but was not executed by the database. This may be due to a connection error.");
            return res.send(err);
        }
        console.info("The attempt has been deleted");
        return res.json({ success: true });
    });
};



