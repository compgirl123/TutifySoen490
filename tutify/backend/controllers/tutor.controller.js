const Tutor = require('../models/models').Tutor;
const Event = require('../models/models').Event;
const Student = require('../models/models').Student;
const Mfiles = require('../models/models').Mfiles;
const Mchunks = require('../models/models').Mchunks;

// this method fetches all available tutors in our database
exports.getTutors = async function (req, res) {
    Tutor.find((err, data) => {
        if (err) {
            console.error("Could not get the list of all tutors");
            return res.json({ success: false, error: err });
        }
        console.info("The list of tutors has been retrieved successfully");
        return res.json({ success: true, data: data });
    });
};

// this method fetches one tutor in our database
exports.getTutor = async function (req, res) {
    Tutor.findOne({ _id: req.query.ID }).populate('courses.course').
        exec(function (err, tutor) {
            if (err) {
                console.error("The specific tutor was not found");
                return res.json({ success: false, error: err });
            }
            console.info("The specific tutor was found");
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
            if (err) {
                console.error("The tutor to update was not retrieved");
                return res.json({ success: false, error: err });
            }
            console.info("The tutor's list of subjects has been updated successfully");

            //update the session
            req.session.userInfo.subjects = user.subjects;
            req.session.save(function (err) {
                if (err) {
                    console.error("The session was unable to be saved");
                    return res.json({ success: false, error: err });
                }
                console.info("The session was able to be saved");
                req.session.reload(function (err) {
                    if (err) {
                        console.warn("The session failed to reload");
                    }
                    else {
                        console.info("The session reloaded successfully");
                    }
                    return res.json({ success: true, newSubjects: user.subjects });
                });
            });
        }
    );
};

// this method overwrites existing tutor in our database
exports.updateTutorInfo = async function (req, res) {
    const { _id, school, program_of_study, first_name, last_name, description } = req.body;
    Tutor.findByIdAndUpdate(_id,
        {
            $set: {
                "school": school, "program_of_study": program_of_study,
                "first_name": first_name, "last_name": last_name,
                "description": description
            }
        },
        { "new": true, "upsert": true },
        (err, user) => {
            if (err) {
                console.error("The tutor's informations were not found");
                return res.json({ success: false, error: err });
            }
            console.info("The changes of the tutor's informations were saved successfully");
            //update the session
            req.session.userInfo = user;
            req.session.save(function (err) {
                if (err) {
                    console.error("The session was unable to be saved");
                    return res.json({ success: false, error: err });
                }
                console.info("The session was able to be saved");
                req.session.reload(function (err) {
                    if (err) {
                        console.warn("The session failed to reload");
                    }
                    else {
                        console.info("The session reloaded successfully");
                    }
                    return res.json({ success: true, userInfo: user });
                });
            });
        }
    );
};

// this method adds an event to the database
exports.addEvent = async function (req, res) {
    const { events, tutor_id, description, location, date, startTime, endTime, students, tutorName, studentNames } = req.body;

    let event = new Event();
    var newEvents = [];
    var count = 0;

    //create event
    event.description = description;
    event.location = location;
    event.date = date;
    event.startTime = startTime;
    event.endTime = endTime;
    event.students = students;
    event.tutor = tutor_id;
    event.tutorName = tutorName;
    event.studentNames = studentNames;

    event.save(function (err, eve) {

        if (err) {
            console.error("The tutor event was unable to be stored in the database");
            return res.json({ success: false, error: err });
        }
        events.push(eve.id);
        Tutor.findByIdAndUpdate(tutor_id,
            { "$push": { "events": eve.id } },
            { "new": true, "upsert": true },
            function (err, tutor) {
                if (err) {
                    console.error("The specific tutor was not found (to assign him/her to the event)");
                    throw err;
                }

                students.forEach(function (student) {
                    Student.findByIdAndUpdate(student,
                        { "$push": { "events": eve.id } },
                        { "new": true, "upsert": true },
                        function (err, student) {
                            if (err) {
                                console.error("Failed to assign student " + student + " to the event");
                                throw err;
                            }
                        });
                });
                //update the session
                req.session.userInfo.events = tutor.events;
                req.session.save(function (err) {
                    if (err) {
                        console.error("The session was unable to be saved");
                        return res.json({ success: false, error: err });
                    }
                    console.info("The session was able to be saved");
                    req.session.reload(function (err) {
                        // session reloaded
                        if (err) {
                            console.warn("The session failed to reload");
                        }
                        else {
                            console.info("The session reloaded successfully");
                        }
                    });

                    events.forEach(function (event) {
                        Event.findOne({ _id: event }, function (err, event) {
                            if (err) {
                                console.error("Could not find the event " + event)
                            };

                            newEvents.push(event);

                            count++;

                            if (count == events.length) {
                                console.info("The event has successfully been added");
                                return res.json({ success: true, data: newEvents });
                            }
                            console.error("The count vs newEvents array size are not equal");

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
        console.info("The events have been loaded successfully");
        return res.json({ success: true, data: newEvents });
    }
    events.forEach(function (event) {

        Event.findOne({ _id: event }, function (err, event) {
            if (err) {
                console.error("The event " + event + " has not been found");
                return res.json({ success: true, error: err });
            };
            newEvents.push(event);
            count++;

            if (count == events.length) {
                console.info("The events have been loaded successfully");
                return res.json({ success: true, data: newEvents });
            }

        });
    });

};

// this method deletes an event from the database
exports.deleteEvent = async function (req, res) {
    const { event_id, tutor_id } = req.body;

    Event.findByIdAndRemove(event_id, (err, event) => {
        if (err) {
            console.error("The event could not be removed (not found)");
            return res.send(err);
        }
        Tutor.findByIdAndUpdate(tutor_id,
            { "$pull": { "events": event_id } },
            function (err, tutor) {
                var index = tutor.events.indexOf(event_id);
                if (index > -1) {
                    tutor.events.splice(index, 1);
                }
                event.students.forEach(function (student) {
                    Student.findByIdAndUpdate(student,
                        { "$pull": { "events": event_id } },
                        function (err, student) {
                            if (err) throw err;
                        });
                });
                console.info("The event was deleted successfully");
                req.session.userInfo.events = tutor.events;
                req.session.save(function (err) {
                    if (err) {
                        console.error("The session was unable to be saved");
                        return res.json({ success: false, error: err });
                    }
                    console.info("The session was able to be saved");
                    req.session.reload(function (err) {
                        if (err) {
                            console.warn("The session failed to reload");
                        }
                        else {
                            console.info("The session reloaded successfully");
                        }
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
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, data: tutor.courses });
        });
};

// this method updates the existing profile image of a tutor
exports.uploadTutorImg = async function (req, res) {
    const { name, _id, prevImg } = req.body;
    const { filename } = req.file;

    // shorten file name if too long
    if (name.split(".")[0].length > 25) {
        name_new = name.substring(0, 25) + "." + name.split(".")[1];
    }
    else {
        name_new = name;
    }

    let newImg = { 
        imgName: name,
        imgData: filename
    }

    Tutor.findByIdAndUpdate(_id,
        { $set: { "uploadedPicture": newImg, }},
        { "new": true, "upsert": true },
        (err, user) => {
            if (err) return res.json({ success: false, error: err });

            // Delete previous image from db
            // Retrieving the file information from the db (from uploads.files)
            Mfiles.findOneAndRemove({ filename: prevImg }, (err, file) => {
                if (err) {
                    console.error("Could not find the specified name by its file name");
                    return res.status(404).send({
                        title: 'File error',
                        message: 'Error finding file',
                        error: err.errMsg
                    });
                } else  {
                    console.error("MFile deleted successfully.");
                    //Retrieving the chunks from the db (from uploads.chunks)       
                    Mchunks.findOneAndRemove({ files_id: file._id }, (err, chunks) => {
                        var chunkArray = chunks;
                        if (!chunkArray || chunkArray.length === 0) {
                            console.error("Could not find the chunks data for the file");
                            return res.status(404).send({
                                title: 'Delete Error',
                                message: 'No data found'
                            });
                        } else {
                            console.error("File chuncks deleted successfully.");
                            //update the session
                            req.session.userInfo = user;
                            req.session.save(function (err) {
                                if (err) {
                                    console.error("The session was unable to be saved");
                                    return res.json({ success: false, error: err });
                                }
                                console.info("The session was able to be saved");
                                req.session.reload(function (err) {
                                    //session reloaded
                                    return res.json({ success: true, userInfo: user });
                                });
                            });
                        }
                    });
                }
            });    
        }
    );
};