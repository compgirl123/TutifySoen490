const UploadedFiles = require('../models/models').UploadedFiles;
const Files = require('../models/models').Files;
const Tutor = require('../models/models').Tutor;
const Course = require('../models/models').Course;
const Profile = require('../models/models').Profile;
var mongoose = require('mongoose');

// This method fetches the latest uploaded document.
exports.getLatestUpload = async function (req, res) {
    UploadedFiles.findOne({ encryptedname: "2451d4f9d53678fba774c05738b234e4.png" }, function (err, mostRecent) {
        return res.json({ success: true, recent: mostRecent });
    });
}

// This method adds restriction information for uploaded documents.
exports.addUploadedFiles = async function (req, res) {
    let uploaded_files = new UploadedFiles();
    const { name, adminTutor, uploadedDocs } = req.body;
    const { filename } = req.file;
    const { _id } = new mongoose.Types.ObjectId();

    var newEvents = [];
    var count = 0;
    var name_shortened = "";

    // Eventually, this will be implemented
    if (name.split(".")[0].length > 25) {
        name_new = name.substring(0, 25) + "." + name.split(".")[1];
    }
    else {
        name_new = name;
    }

    uploaded_files.save(function (err) {
        UploadedFiles.findByIdAndUpdate(_id,
            {
                $set: {
                    "name": name_new,
                    "adminTutor": adminTutor,
                    "encryptedname": filename,
                    "link": "http://localhost:3000/document/" + filename,
                    "uploadDate": new Date()
                }
            },
            { "new": true, "upsert": true },
            function (err, tutor) {
                if (err) throw err;
            });
    });

    res.redirect("/uploadingDocs" + req.body.name);
}

// This Method Gets the Document Files from the Database
exports.populateUploadedFiles = async function (req, res) {
    var tutor_id = 0;

    Object.keys(req.sessionStore.sessions).forEach(function (key) {
        var parsed_tutor_cookie = JSON.parse(req.sessionStore.sessions[key]);
        var parsed_tutor_info = parsed_tutor_cookie.userInfo;
        if (typeof parsed_tutor_info !== "undefined") {
            tutor_id = parsed_tutor_info._id;
        }
    });

    UploadedFiles.find({ adminTutor: tutor_id }, function (err, uploaded_docs) {
        return res.json({ success: true, file: uploaded_docs });
    });

};

// this method enables the tutor to share their uploaded documents to their courses.
exports.assignCourse = async function (req, res) {
    let uploaded_files = new UploadedFiles();
    let course = new Course();
    const { course_id, file_name } = req.body;

    Course.findOne({ name: course_id }, function (err, course_name) {
        UploadedFiles.findOne({ encryptedname: file_name }, function (err, encrypted_file_name) {
            uploaded_files.save(function (err) {
                UploadedFiles.findByIdAndUpdate(encrypted_file_name._id,
                    {
                        "$push": {
                            "sharedToCourses": course_name._id
                        }
                    },
                    { "new": true, "upsert": true },
                    function (err, tutor) {
                        if (err) throw err;
                    });
            });
            course.save(function (err) {
                Course.findByIdAndUpdate(course_name._id,
                    {
                        "$push": {
                            "sharedToCourses": encrypted_file_name._id
                        }
                    },
                    { "new": true, "upsert": true },
                    function (err, tutor) {
                        if (err) throw err;
                    });
            });
        });
    });
}

// this method enables the tutor to share their uploaded documents to their students.
exports.assignCourseStudent = async function (req, res) {
    let uploaded_files = new UploadedFiles();
    let profile = new Profile();
    const { first_name_student, last_name_student, file_name } = req.body;
    Profile.findOne({ first_name: first_name_student, last_name: last_name_student }, function (err, student_info) {
        UploadedFiles.findOne({ encryptedname: file_name }, function (err, encrypted_file_name) {
            uploaded_files.save(function (err) {
                UploadedFiles.findByIdAndUpdate(encrypted_file_name._id,
                    {
                        "$push": {
                            "sharedToStudents": student_info._id
                        }
                    },
                    { "new": true, "upsert": true },
                    function (err, tutor) {
                        if (err) throw err;
                    });
            });
            profile.save(function (err) {
                Profile.findByIdAndUpdate(student_info._id,
                    {
                        "$push": {
                            "sharedToStudents": encrypted_file_name._id
                        }
                    },
                    { "new": true, "upsert": true },
                    function (err, tutor) {
                        if (err) throw err;
                    });
            });
        });
    });
}

// this method enables the students to view all of their shared documents.
exports.viewDocs = async function (req, res) {
    var student_account = 0;

    Object.keys(req.sessionStore.sessions).forEach(function (key) {
        var parsed_student_cookie = JSON.parse(req.sessionStore.sessions[key]);
        var parsed_student_info = parsed_student_cookie.userInfo;
        if (typeof parsed_student_info !== "undefined") {
            student_account = parsed_student_info.account;
        }
    });

    Profile.findOne({ account: student_account }, async (err, sharedDocs) => {
        await UploadedFiles.find({ _id: { $in: sharedDocs.sharedToStudents } }, async (err, tst) => {
            var response = [];
            for (var file of tst) {
                await Profile.findOne({ _id: file.adminTutor }, async (err, tutor) => {
                    var tutorName = tutor.first_name + " " + tutor.last_name
                    file = Object.assign({ tutorName: tutorName }, file);
                    response.push(file);
                });
            };
            return res.json({ success: true, file: response });

        });
    });
}

// this method enables each class to view all of their shared documents.
exports.viewCourseDocs = async function (req, res) {
    let course = new Course();
    var r = /\d+/;
    var s = req.headers.referer.match(/.*\/(.*)$/)[1];

    Course.findOne({ name: req.headers.referer.match(/.*\/(.*)$/)[1].substring(0, 4) + " " + s.match(r)[0] }, function (err, course_info) {
        UploadedFiles.find({ _id: { $in: course_info.sharedToCourses } }, function (err, courses) {
            return res.json({ success: true, file: courses });
        });
    });
}

// this method enables each class to view all of their shared documents.
exports.deleteFiles = async function (req, res) {
    const {file_id} = req.body;
    console.log(file_id);
   /**Event.findByIdAndRemove(event_id, (err,event) => {
        if (err) return res.send(err);
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
                req.session.userInfo.events = tutor.events;
                req.session.save(function (err) {
                    req.session.reload(function (err) {



                        return res.json({ success: true, userInfo: tutor });
                    });
                });
            });
    }); */
 }
