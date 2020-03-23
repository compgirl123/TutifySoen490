const QuizPoints = require('../models/models').QuizPoints;

// this method adds a new quiz to the database
exports.addQuizPointsStudent = async function (req, res) {
    const { points,quizId } = req.body;
    // questions
    // new quiz to be added by tutor
    let quizpoints = new QuizPoints();
    quizpoints.points = points;
    quizpoints.quizId = quizId;
    console.log("points are:");
    console.log(points);
    quizpoints.save(function (err, quizes) {
        if (err) {
            console.error(err);
            console.error("The quiz couldn't get added to the database (API request failed)");
            return res.json({ success: false, error: err });
        }
        console.info("The quiz was successfully added to the database");
        return res.json({ success: true, data: quizpoints });
    });
};

