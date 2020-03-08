const Quizes = require('../models/models').Quizes;

// this method fetches all available quizes in our database
exports.getQuizes = async function (req, res) {
    var id = [];
    if (req.session.userInfo.__t == "tutor") {
        id.push(req.session.userInfo._id);
    }
    else if (req.session.userInfo.__t == "student") {
        id.push(req.query.tutor);
    }
    Quizes.find({ tutorId: { $in: id } }, function (err, video) {
        if (err) {
            console.error("The quizes were not found");
            return res.json({ success: false, error: err })
        }
        console.info("The quizes were found");
        return res.json({ success: true, data: video });
    });
};

// this method select quizes in our database
exports.getSelectQuizes = async (req, res) => {
    var id = [];
    if (req.session.userInfo.__t == "tutor") {
        id.push(req.session.userInfo._id);
    }
    else if (req.session.userInfo.__t == "student") {
        id.push(req.query.tutor);
    }
    await Quizes.find({ tutorId: { $in: id }, course: req.query.tutorClasses[req.query.courseSelected] }, async (err, video) => {
        if (err) {
            console.error("The quizes were not found");
            return await res.json({ success: false, error: err })
        }
        console.info("The quizes were found");
        return await res.json({ success: true, data: video });
    });

};

// this method adds a new video to the database
exports.addVideo = async function (req, res) {
    const { title, description, questions, choices, answers, tutorId, course } = req.body;
    // new video to be added by tutor
    let quizes = new Quizes();
    quizes.title = title;
    quizes.description = description;
    quizes.questions = questions;
    quizes.choices = choices;
    quizes.answers = answers;
    quizes.tutorId = tutorId;
    quizes.course = course;
    quizes.save(function (err, quizes) {
        if (err) {
            console.error(err);
            console.error("The quiz couldn't get added to the database (API request failed)");
            return res.json({ success: false, error: err });
        }
        console.info("The quiz was successfully added to the database");
        return res.json({ success: true, data: quizes });
    });
};

// this method deletes a new quiz to the db
exports.deleteVideo = async function (req, res) {
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



