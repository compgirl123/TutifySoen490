const Tutor = require('../models/models').Tutor;

// this method fetches all available tutors in our database
exports.getTutors = async function (req, res) {
    Tutor.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
};

// this method fetches one tutor in our database
exports.getTutor = async function (req, res) {
    Tutor.findOne({ _id: req.query.ID }).populate('students').
        exec(function (err, tutor) {
            if (err) return handleError(err);    
            return res.json({ success: true, tutor: tutor });
        });
};

// this method overwrites existing tutor in our database
exports.updateTutor = async function (req, res) {
    const { _id, subjects } = req.body;
    Tutor.findByIdAndUpdate(_id,
        { "$push": { "subjects": subjects } },
        { "new": true, "upsert": true },
        (err, user) => {
            if (err) return res.json({ success: false, error: err });
            //update the session
            req.session.userInfo.subjects = user.subjects;       
            req.session.save( function(err) {
                req.session.reload( function (err) {
                    //session reloaded
                    return res.json({ success: true, newSubjects: user.subjects });
                });
            });       
        }
    );
};

// this method overwrites existing tutor in our database
exports.updateTutorInfo = async function (req, res) {
    const { _id, school,program_of_study,first_name,last_name } = req.body;
    Tutor.findByIdAndUpdate(_id,
        {$set: { "school" : school, "program_of_study": program_of_study, 
                 "first_name": first_name,"last_name":last_name } },
        { "new": true, "upsert": true },
        (err, user) => {
            if (err) return res.json({ success: false, error: err });
            //update the session
            req.session.userInfo = user;       
            req.session.save( function(err) {
                req.session.reload( function (err) {
                    //session reloaded
                    return res.json({ success: true, userInfo: user });
                });
            });       
        }
    );
};