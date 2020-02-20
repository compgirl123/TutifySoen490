const Videos = require('../models/models').Videos;

// this method fetches all available videos in our database
exports.getVideos = async function (req, res) {
    var id = [];
    if(req.session.userInfo.__t == "tutor"){
       id.push(req.session.userInfo._id); 
    }
    else if(req.session.userInfo.__t == "student"){
        id.push(req.query.tutor);
    }

    Videos.find({ tutorId: {$in:id} }, function (err, video) {
        if (err) {
            console.error("The videos were not found");
            return res.json({ success: false, error: err })
        }
        console.info("The videos were found");
        return res.json({ success: true, data: video });
    });
};

// this method adds a new video to the db
exports.addVideo = async function (req, res) {
    const { title, description, videoLink, tutorId } = req.body;
    // new video to add 
    let videos = new Videos();
    videos.title = title;
    videos.description = description;
    videos.videoLink = videoLink;
    videos.tutorId = tutorId;

    videos.save(function (err, videos) {
        if (err) {
            console.log(err);
            console.error("The video couldn't get added to the database (API request failed)");
            return res.json({ success: false, error: err });
        }
        console.info("The video was successfully added to the database");
        return res.json({ success: true, data: videos });
    });
};

// this method deletes a new video to the db
exports.deleteVideo = async function (req, res) {
    const { _id } = req.body;
    Videos.findByIdAndRemove(_id, (err) => {
        if (err) {
            console.error("The delete order was given, but was not executed by the database. This may be due to a connection error.");
            return res.send(err);
        }
        console.info("The video has been deleted");
        return res.json({ success: true });
    });
};



