const Quizzes = require('../models/models').Quizzes;
const Questions = require('../models/models').Questions;
const QuizAttempt = require('../models/models').QuizAttempt;
const Course = require('../models/models').Course;
const Student = require('../models/models').Student;

// this method fetches all available quizzes from a tutor in our database.
exports.getQuizes = async (req, res) => {
    var id = [];
    if (req.session.userInfo.__t == "tutor") {
        id.push(req.session.userInfo._id);
        console.info("Push quiz id's to id array for tutor");
    }
    else if (req.session.userInfo.__t == "student") {
        id.push(req.query.tutor);
        console.info("Push quiz id's to id array for student");
    }
    Quizzes.find({ tutorId: { $in: id } }, function (err, quiz) {
        if (err) {
            console.error("The quizzes were not found");
            return res.json({ success: false, error: err })
        }
        console.info("The quizzes were found");
        return res.json({ success: true, data: quiz });
    });
};

// this method select all the quizzes by the specific course. 
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
        await Quizzes.find({ tutorId: { $in: id }, course: foundCourse }).populate([
            {
                path: 'attempts',
                select: 'student'
            },
            {
                path: 'course'
            }
        ]).exec(function (err, quizzes) {
            if (err) {
                console.error("The quizzes were not found");
                return res.json({ success: false, error: err })
            }
            if (req.session.userInfo.__t == "student") {
                mod_quizes = [];
                for (index = 0; index < quizzes.length; index++) {
                    var quiz = quizzes[index].toObject();
                    attempt_done = 0;
                    if (quiz.attempts != undefined) {
                        if (quiz.attempts.length == undefined) {
                            if (quiz.attempts.student == req.session.userInfo._id) {
                                console.info("Increase attempt number");
                                attempt_done++;
                            }
                        }
                        else {
                            for (attemptIndex = 0; attemptIndex < quiz.attempts.length; attemptIndex++) {
                                if (quiz.attempts[attemptIndex].student == req.session.userInfo._id) {
                                    console.info("Increase attempt number");
                                    attempt_done++;
                                }
                            }
                        }
                    }
                    console.info("Set allowed attempts left for student");
                    quiz.available_attempts = quiz.allowed_attempts - attempt_done;
                    quiz.attempt_number = attempt_done;
                    mod_quizes.push(quiz);
                }
                console.info("The quizzes of the course were found");
                return res.json({ success: true, data: mod_quizes });
            }
            else {
                console.info("The quizzes of the course were found");
                return res.json({ success: true, data: quizzes });
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
    await Quizzes.findOne({ _id: req.query.quizId }, async (err, quiz) => {
        if (err) {
            console.error("The quizzes were not found");
            return await res.json({ success: false, error: err })
        }
        console.info("The specific quiz was found");
        return await res.json({ success: true, data: quiz });
    });
};

// this method returns all information concerning the specific quiz attempts for the quiz that the user has selected 
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
            console.error("The quizzes were not found");
            return await res.json({ success: false, error: err })
        }
        console.info("The specific quiz was found");
        return await res.json({ success: true, data: quiz });
    });
};

// this method adds a new quiz to the database.
exports.addQuiz = async function (req, res) {
    const { title, description, tutorId, points, course, allowed_attempts } = req.body;
    let quizzes = new Quizzes();
    quizzes.title = title;
    quizzes.description = description;
    quizzes.tutorId = tutorId;
    quizzes.points = points;
    quizzes.allowed_attempts = allowed_attempts;
    quizzes.attempts = [];
    await Course.findOne({ name: course, tutors: { $in: [tutorId] } }, async (err, foundCourse) => {
        quizzes.course = foundCourse;
        quizzes.save(function (err, quizzes) {
            if (err) {
                console.error(err);
                console.error("The quiz couldn't get added to the database (API request failed)");
                return res.json({ success: false, error: err });
            }
            console.info("The quiz was successfully added to the database");
            return res.json({ success: true, data: quizzes });
        });
    });
};

// this method adds a new attempt and links it to the quiz.
exports.addAttempt = async function (req, res) {
    const { completed_attempts, quiz_id, studentId, quiz_points_scored } = req.body;
    let attempt = new QuizAttempt();
    attempt.completed_attempts = completed_attempts;
    attempt.quiz = quiz_id;
    attempt.student = studentId;
    attempt.quiz_points_scored = quiz_points_scored;
    var attempts = [];
    QuizAttempt.find({ quiz: quiz_id, student: studentId }, function (err, quizzes) {
        if (quizzes.length == 0) {
            attempt.attempt_number = 1;
        }
        else {
            quizzes.forEach(function (err, quizId) {
                attempts.push(quizzes[quizId].attempt_number);
                console.info("Added attempts to database.");
            });
            attempt.attempt_number = Math.max(...attempts) + 1;
        }
        attempt.save(function (err, attempt) {
            if (err) {
                console.error("The attempt couldn't get added to the database (API request failed)");
                console.error(err);
                return res.json({ success: false, error: err });
            }
            console.info("The attempt was successfully added to the database");
            Quizzes.findOneAndUpdate({ _id: attempt.quiz }, { "$push": { "attempts": attempt._id } }, { useFindAndModify: false }, (error) => {
                if (error) {
                    console.error("Could not link the quiz to the attempt");
                    console.error(error);
                    return res.json({ success: false, error: error });
                }
                return res.json({ success: true, data: attempt });
            });
        });
    });
};

// this method adds the total points for quizzes for each user.
exports.addTotalPointsForUser = async function (req, res) {
    const { totalPoints } = req.body;
    var points = [];
    for (var key in totalPoints) {
        var value = totalPoints[key];
        points.push(Math.max(...value));
    }
    var totalP = 0;
    for (var i in points) { totalP += points[i]; }
    if (req.session.userInfo.__t === "student") {
    Student.findByIdAndUpdate({ _id: req.session.userInfo._id },
        { $set: { "totalPoints": totalP } },
        { "new": true, "upsert": true },
        function (err) {
            console.info("Adding Total Points to the Profile of the user");
            if (err) throw err;
        });
    }
};

// this method is to get all the attempts of a specific student.
exports.getStudentAttempts = async function (req, res) {
    var lookup = [];
    var tutorIdFromLogin = "";
    var filteredAttempts = [];

    if (req.session.userInfo.__t === "tutor") {
        lookup = req.session.userInfo.students;
        tutorIdFromLogin = req.session.userInfo._id;
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
    ]).sort({ quiz: 1 }).
        exec(function (err, attempts) {
            if (req.session.userInfo.__t === "tutor") {
            attempts.forEach(function (err, quizId) {
                if(attempts[quizId].quiz.tutorId._id == tutorIdFromLogin){
                   filteredAttempts.push(attempts[quizId]);
                }
            });
           }
            if (req.session.userInfo.__t === "student") {
                filteredAttempts = attempts;
            }
            if (err) {
                console.error("The specific tutor was not found");
                return res.json({ success: false, error: err });
            }
            console.info("The specific tutor was found");
            return res.json({ success: true, data: filteredAttempts });
        });
}

// this method fetches all the quiz quizzes present in the database.
exports.getAllQuestions = async function (req, res) {
    Questions.find({}, async (err, questions) => {
        if (err) {
            console.error("The quizzes were not found");
            return await res.json({ success: false, error: err })
        }
        console.info("The questions were found");
        return await res.json({ success: true, data: questions });
    })
};

// this method retrieves the quiz questions for the current quiz selected.
exports.getSelectedQuizQuestions = async function (req, res) {
    var quiz_questions = [];
    await Quizzes.find({ _id: req.query.quizId }, async (err, questions) => {
        await questions.forEach(async function (err, question) {
            await (questions[question].questions).forEach(async function (err, q) {
                await Questions.find({ _id: questions[question].questions }, async (err, questionset) => {
                    await (questionset).forEach(async function (err, eachquestion) {
                        quiz_questions.push(questionset[eachquestion]);
                    });
                    if (err) {
                        console.error("The quizzes were not found");
                    }
                    console.info("The specific quiz' questions were found");
                    return await res.json({ success: true, data: quiz_questions });
                })
            });
        });
    })
};

// this method adds a new question to the database.
exports.addQuestion = async function (req, res) {
    const { question, choices, answerIndex, creator, quizId, points } = req.body;
    let questions = new Questions();
    console.log(choices);
    questions.question = question;
    questions.choices = choices;
    questions.answerIndex = answerIndex;
    questions.creator = creator;
    questions.quizId = quizId;
    questions.points = points;
    questions.save(function (err, question) {
        if (err) {
            console.error(err);
            console.error("The question couldn't get added to the database (API request failed)");
            return res.json({ success: false, error: err });
        }
        Quizzes.findByIdAndUpdate(quizId,
            {
                "$push": {
                    "questions": question._id
                }
            },
            { "new": true, "upsert": true },
            function (err, profile) {
                if (err) {
                    console.error("The question was unable to be updated in the database");
                    throw err;
                }
                else {
                    console.info("The question was added successfully");
                }
            });
        console.info("The question was successfully added to the database");
        return res.json({ success: true, data: question });
    });
};

// this method deletes a quiz from the db.
exports.deleteQuiz = async function (req, res) {
    const { _id } = req.body;
    await Quizzes.find({ _id: _id }, async function (err, quizzes) {
        await quizzes.forEach(async function (err, quiz) {
            await quizzes[quiz].questions.forEach(async function (err, quizId) {
                await Questions.findByIdAndRemove(quizzes[quiz].questions[quizId],
                    async function (err, student) {
                        if (err) {
                            console.error("Unable to delete the quiz(s) in reference to the selected quiz");
                        }
                        console.info("Quiz question(s) Deleted");
                    });
                await QuizAttempt.find({ quiz: _id }, async function (err, quizzes) {
                    await quizzes.forEach(async function (err, quizId) {
                        await QuizAttempt.findByIdAndRemove(quizzes[quizId]._id,
                            async function (err, student) {
                                if (err) {
                                    console.error("Unable to delete the quiz attempt in reference to the selected quiz");
                                }
                                console.info("Quiz attempt(s) Deleted");
                            });
                    });
                });
            });
        });
    });
    Quizzes.findByIdAndRemove(_id, (err) => {
        if (err) {
            console.error("The delete order was given, but was not executed by the database. This may be due to a connection error.");
            return res.send(err);
        }
        console.info("Quiz Deleted");
        return res.json({ successQuiz: true });
    });
};

// this method deletes a question from the db.
exports.deleteQuestion = async function (req, res) {
    const { _id } = req.body;
    Questions.findByIdAndRemove(_id, (err) => {
        if (err) {
            console.error("The delete order was given, but was not executed by the database. This may be due to a connection error.");
            return res.send(err);
        }
        console.info("Question has been deleted");
        return res.json({ success: true });
    });
};

// this method deletes an attempt from the db.
exports.deleteAttempt = async function (req, res) {
    const { _id } = req.body;
    QuizAttempt.findByIdAndRemove(_id, (err) => {
        if (err) {
            console.error("The delete order was given, but was not executed by the database. This may be due to a connection error.");
            return res.send(err);
        }
        console.info("The attempt has been deleted");
        return res.json({ success: true });
    });
};