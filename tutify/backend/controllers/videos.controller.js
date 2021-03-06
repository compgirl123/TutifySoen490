const Videos = require('../models/models').Videos;
const Course = require('../models/models').Course;

// this method fetches all available videos in our database
exports.getVideos = async function (req, res) {
    var id = [];
    if (req.session.userInfo.__t == "tutor") {
        id.push(req.session.userInfo._id);
    }
    else if (req.session.userInfo.__t == "student") {
        id.push(req.query.tutor);
    }
    Videos.find({ tutorId: { $in: id } }, function (err, video) {
        if (err) {
            console.error("The videos were not found");
            return res.json({ success: false, error: err })
        }
        console.info("The videos were found");
        return res.json({ success: true, data: video });
    });
};

// this method select videos in our database
exports.getSelectVideos = async (req, res) => {
    var id = [];
    if (req.session.userInfo.__t == "tutor") {
        id.push(req.session.userInfo._id);
    }
    else if (req.session.userInfo.__t == "student") {
        id.push(req.query.tutor);
    }
    await Course.findOne({ name: req.query.tutorClasses[req.query.courseSelected], tutors: { $in: id } }, async (err, course) => {
        await Videos.find({ tutorId: { $in: id }, course: course }, async (err, video) => {
            if (err) {
                console.error("The videos were not found");
                return await res.json({ success: false, error: err })
            }
            console.info("The videos were found");
            return await res.json({ success: true, data: video });
        });
    });
};

// this method adds a new video to the database
exports.addVideo = async function (req, res) {
    const { title, description, videoLink, tutorId, course } = req.body;
    // new video to be added by tutor
    let videos = new Videos();
    videos.title = title;
    videos.description = description;
    videos.videoLink = videoLink;
    videos.tutorId = tutorId;
    await Course.findOne({ name: course, tutors: { $in: [tutorId] } }, async (err, foundCourse) => {
        videos.course = foundCourse; 
        videos.save(function (err, videos) {
            if (err) {
                console.error(err);
                console.error("The video couldn't get added to the database (API request failed)");
                return res.json({ success: false, error: err });
            }
            console.info("The video was successfully added to the database");
            return res.json({ success: true, data: videos });
        });
    });
};

// this method deletes a new video to the db
exports.deleteVideo = async function (req, res) {
    const { _id } = req.body;
    // selected video to delete by tutor
    Videos.findByIdAndRemove(_id, (err) => {
        if (err) {
            console.error("The delete order was given, but was not executed by the database. This may be due to a connection error.");
            return res.send(err);
        }
        console.info("The video has been deleted");
        return res.json({ success: true });
    });
};



