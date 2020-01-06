const Tutor = require('../models/models').Tutor;
const Event = require('../models/models').Event;

// this method fetches all available tutors in our database
exports.getTutors = async function (req, res) {
    Tutor.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
};

// this method fetches one tutor in our database
exports.getTutor = async function (req, res) {
    Tutor.findOne({ _id: req.query.ID }).populate('courses.course').
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
            req.session.save(function (err) {
                req.session.reload(function (err) {
                    //session reloaded
                    return res.json({ success: true, newSubjects: user.subjects });
                });
            });
        }
    );
};

// this method overwrites existing tutor in our database
exports.updateTutorInfo = async function (req, res) {
    const { _id, school, program_of_study, first_name, last_name } = req.body;
    Tutor.findByIdAndUpdate(_id,
        {
            $set: {
                "school": school, "program_of_study": program_of_study,
                "first_name": first_name, "last_name": last_name
            }
        },
        { "new": true, "upsert": true },
        (err, user) => {
            if (err) return res.json({ success: false, error: err });
            //update the session
            req.session.userInfo = user;
            req.session.save(function (err) {
                req.session.reload(function (err) {
                    //session reloaded
                    return res.json({ success: true, userInfo: user });
                });
            });
        }
    );
};

// this method adds an event to the database
exports.addEvent = async function (req, res) {
    const { events, tutor_id, description, location, date, startTime, endTime } = req.body;

    let event = new Event();
    var newEvents = [];
    var count = 0;

    //create event
    event.description = description;
    event.location = location;
    event.date = date;
    event.startTime = startTime;
    event.endTime = endTime;

    event.save(function (err, eve) {

        if (err) return res.json({ success: false, error: err });
        events.push(eve.id);
        Tutor.findByIdAndUpdate(tutor_id,
            { "$push": { "events": eve.id } },
            { "new": true, "upsert": true },
            function (err, tutor) {
                if (err) throw err;

                //update the session
                req.session.userInfo.events = tutor.events;
                req.session.save(function (err) {
                    req.session.reload(function (err) {
                        // session reloaded
                    });

                    events.forEach(function (event) {
                        Event.findOne({ _id: event }, function (err, event) {
                            if (err) {

                            };
                            newEvents.push(event);
                            count++;

                            if (count == events.length) {

                                return res.json({ success: true, data: newEvents });
                            }

                        });
                    });
                });
            });
    });

};


// this method gets events from the database
exports.populateEvents = async function (req, res) {
    const { events } = req.body;

    var newEvents = [];
    var count = 0;

    if (count == events.length) {

        return res.json({ success: true, data: newEvents });
    }
    events.forEach(function (event) {

        Event.findOne({ _id: event }, function (err, event) {
            if (err) {

            };
            newEvents.push(event);
            count++;

            if (count == events.length) {

                return res.json({ success: true, data: newEvents });
            }

        });
    });

};

// this method deletes an event from the database
exports.deleteEvent = async function (req, res) {
    const { event_id, tutor_id } = req.body;

    Event.findByIdAndRemove(event_id, (err) => {
        if (err) return res.send(err);
        Tutor.findByIdAndUpdate(tutor_id,
            { "$pull": { "events": event_id } },
            function (err, tutor) {
                var index = tutor.events.indexOf(event_id);
                if (index > -1) {
                    tutor.events.splice(index, 1);
                }
                req.session.userInfo.events = tutor.events;
                req.session.save(function (err) {
                    req.session.reload(function (err) {



                        return res.json({ success: true, userInfo: tutor });
                    });
                });
            });
    });

};

// this method fetches the courses associated with the current tutor
exports.getTutorCourses = async function (req, res) {
    Tutor.findOne({ _id: req.session.userInfo._id }).populate('courses.course').
        exec(function (err, tutor) {
            if (err) return handleError(err);
            return res.json({ success: true, data: tutor.courses });
        });
};