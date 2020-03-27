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
        console.info("Get Tutor Id");
    }
    else if (req.session.userInfo.__t == "student") {
        id.push(req.query.tutor);
        console.info("Get Tutor Id");
    }

    await Course.findOne({ name: req.query.tutorClasses[req.query.courseIndex], tutors: { $in: id } }, async (err, foundCourse) => {
        await Quizes.find({ tutorId: { $in: id }, course: foundCourse }).populate([
            {
                path: 'attempts',
                select: 'student'
            },
            {
                path: 'course'
            }
        ]).exec(function (err, quizes) {
            if (err) {
                console.error("The quizes were not found");
                return res.json({ success: false, error: err })
            }

            if (req.session.userInfo.__t == "student") {
                mod_quizes = [];
                for (index = 0; index < quizes.length; index++) {
                    var quiz = quizes[index].toObject();
                    attempt_done = 0;
                    if (quiz.attempts != undefined) {
                        if (quiz.attempts.length == undefined) {
                            if (quiz.attempts.student == req.session.userInfo._id) {
                                attempt_done++;
                            }
                        }
                        else {
                            for (attemptIndex = 0; attemptIndex < quiz.attempts.length; attemptIndex++) {
                                console.warn(quiz);
                                if (quiz.attempts[attemptIndex].student == req.session.userInfo._id) {
                                    attempt_done++;
                                }
                            }
                        }
                    }

                    quiz.available_attempts = quiz.allowed_attempts - attempt_done;
                    mod_quizes.push(quiz);
                }
                console.info("The quizes of the course were found");
                return res.json({ success: true, data: mod_quizes });

            }
            else {
                console.info("The quizes of the course were found");
                return res.json({ success: true, data: quizes });
            }

        });


    });
};

// this method returns the specific quiz the user is on.
exports.getSpecificQuiz = async (req, res) => {
    var id = [];
    if (req.session.userInfo.__t == "tutor") {
        id.push(req.session.userInfo._id);
        console.info("Get Tutor Id");
    }
    else if (req.session.userInfo.__t == "student") {
        id.push(req.query.tutor);
        console.info("Get Tutor Id");
    }
    await Quizes.findOne({ _id: req.query.quizId }, async (err, quiz) => {
        if (err) {
            console.error("The quizes were not found");
            return await res.json({ success: false, error: err })
        }
        console.info("The specific quiz was found");
        return await res.json({ success: true, data: quiz });
    });
};

// this method returns the specific quiz the user is on.
exports.getSpecificQuizAttempts = async (req, res) => {
    var id = [];
    if (req.session.userInfo.__t == "tutor") {
        id.push(req.session.userInfo._id);
        console.info("Get Tutor Id");
    }
    else if (req.session.userInfo.__t == "student") {
        id.push(req.query.tutor);
        console.info("Get Tutor Id");
    }
    await QuizAttempt.find({ _id: req.query.quizId }, async (err, quiz) => {
        if (err) {
            console.error("The quizes were not found");
            return await res.json({ success: false, error: err })
        }
        console.info("The specific quiz was found");
        return await res.json({ success: true, data: quiz });
    });
};

// this method adds a new quiz to the database
exports.addQuiz = async function (req, res) {
    const { title, description, tutorId, points, course, allowed_attempts } = req.body;
    // questions
    // new quiz to be added by tutor
    let quizes = new Quizes();
    quizes.title = title;
    quizes.description = description;
    quizes.tutorId = tutorId;
    quizes.points = points;
    quizes.allowed_attempts = allowed_attempts;
    quizes.attempts = [];
    // ADD A FIND ONE FOR THE OTHER DB TOO
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
};

// this method adds a new attempt and links it to the quiz
exports.addAttempt = async function (req, res) {
    const { completed_attempts, attempts_left, quiz_id, studentId } = req.body;
    // new quiz to be added by tutor
    let attempt = new QuizAttempt();
    attempt.completed_attempts = completed_attempts;
    attempt.quiz = quiz_id;
    attempt.student = studentId;
    attempt.save(function (err, attempt) {
        if (err) {
            console.error(err);
            console.error("The attempt couldn't get added to the database (API request failed)");
            return res.json({ success: false, error: err });
        }
        console.info("The attempt was successfully added to the database");
        Quizes.findOneAndUpdate({ _id: attempt.quiz }, { "$push": { "attempts": attempt._id } }, { useFindAndModify: false }, (error) => {
            if (error) {
                console.error("Could not link the quiz to the attempt");
                console.error(error);
                return res.json({ success: false, error: error });
            }
            return res.json({ success: true, data: attempt });
        });

    });
};

// This method is to get all the attempts of a specific student
exports.getStudentAttempts = async function (req, res) {
    var lookup = [];
    if (req.session.userInfo.__t === "tutor") {
        lookup = req.session.userInfo.students;
        console.info("Saving an array of student id's collected from tutor account");
    }
    else if (req.session.userInfo.__t === "student") {
        lookup.push(req.session.userInfo._id);
        console.info("Saving the current student's id collected from student account");
    }
    QuizAttempt.find({ student: { $in: lookup } }).populate([
        {
            path: 'quiz',
            populate: {
                path: 'course'
            }
        },
        {
            path: 'quiz',
            populate: {
                path: 'tutorId'
            }
        },
        {
            path: 'student'
        }
    ]).
        exec(function (err, attempts) {
            if (err) {
                console.error("The specific tutor was not found");
                return res.json({ success: false, error: err });
            }
            console.info("The specific tutor was found");
            return res.json({ success: true, data: attempts });
        });

}

// this method adds a new quiz to the database
exports.getAllQuestions = async function (req, res) {
    Questions.find({}, async (err, questions) => {
        if (err) {
            console.error("The quizes were not found");
            return await res.json({ success: false, error: err })
        }
        console.info("The questions were found");
        return await res.json({ success: true, data: questions });
    })
};

// this method retrieves the questions for the current quiz selected
exports.getSelectedQuizQuestions = async function (req, res) {
    var quiz_questions = [];
    await Quizes.find({ _id: req.query.quizId }, async (err, questions) => {
        await questions.forEach(async function (err, question) {
            await (questions[question].questions).forEach(async function (err, q) {
                await Questions.find({ _id: questions[question].questions }, async (err, qs) => {
                    await (qs).forEach(async function (err, qa) {
                        quiz_questions.push(qs[qa]);
                    });
                    if (err) {
                        console.error("The quizes were not found");
                    }
                    console.info("The specific quiz' questions were found");
                    return await res.json({ success: true, data: quiz_questions });
                })
            });
        });
    })
};

// this method adds a new question to the database
exports.addQuestion = async function (req, res) {
    const { question, choices, answerIndex, creator, course, quizId } = req.body;
    // new quiz to be added by tutor
    let questions = new Questions();
    let quizes = new Quizes();
    questions.question = question;
    questions.choices = choices;
    questions.answerIndex = answerIndex;
    questions.creator = creator;
    questions.quizId = quizId;
    questions.save(function (err, question) {
        if (err) {
            console.error(err);
            console.error("The question couldn't get added to the database (API request failed)");
            return res.json({ success: false, error: err });
        }
        Quizes.findByIdAndUpdate(quizId,
            {
                "$push": {
                    "questions": question._id
                }
            },
            { "new": true, "upsert": true },
            function (err, profile) {
                if (err) {
                    console.error("The uploaded file was unable to be updated in the database");
                    throw err;
                }
                else {
                    console.info("The file was uploaded successfully");
                }
            });
        console.info("The question was successfully added to the database");
        return res.json({ success: true, data: question });
    });
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



