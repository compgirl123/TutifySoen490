const UploadedFiles = require('../models/models').UploadedFiles;
const Course = require('../models/models').Course;
const Profile = require('../models/models').Profile;
const Mfiles = require('../models/models').Mfiles;
const Mchunks = require('../models/models').Mchunks;
var mongoose = require('mongoose');

// This method fetches the latest uploaded document.
exports.getLatestUpload = async function (req, res) {
    UploadedFiles.find({},function(err,mostRecent){
        return res.json({ success: true, recent: mostRecent });
    }).sort({_id:-1}).limit(1);
}


// This method adds restriction information for uploaded documents.
exports.addUploadedFiles = async function (req, res) {
    let uploaded_files = new UploadedFiles();
    const { name, adminTutor } = req.body;
    const { filename } = req.file;
    const { _id } = new mongoose.Types.ObjectId();

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
    const { file_id } = req.body;

    UploadedFiles.findOne({ encryptedname: file_id }, function (err, fileToDelete) {
        fileToDelete.sharedToStudents.forEach(function (err, studentIndex) {
            Profile.findOne({ _id: fileToDelete.sharedToStudents[studentIndex] }, function (err, userfiles) {
                userfiles.sharedToStudents.forEach(function (err, studentIndex1) {
                    if (userfiles.sharedToStudents[studentIndex1] == fileToDelete._id) {
                        Profile.findByIdAndUpdate(fileToDelete.sharedToStudents[studentIndex],
                            { "$pull": { "sharedToStudents": fileToDelete._id } },
                            function (err, student) {
                                if (err) throw err;
                            });
                    }
                });
            });
        });
        fileToDelete.sharedToCourses.forEach(function (err, courseIndex) {
            Course.findOne({ _id: fileToDelete.sharedToCourses[courseIndex] }, function (err, userfiles1) {
                userfiles1.sharedToCourses.forEach(function (err, studentIndex2) {
                    if (userfiles1.sharedToCourses[studentIndex2] == fileToDelete._id) {
                        Course.findByIdAndUpdate(fileToDelete.sharedToCourses[courseIndex],
                            { "$pull": { "sharedToCourses": fileToDelete._id } },
                            function (err, student) {
                                if (err) throw err;
                            });
                    }
                });
            });
        });
        UploadedFiles.findByIdAndRemove(fileToDelete._id, (err, file) => {
            if (err) return res.send(err);
        });
    });
    Mfiles.findOne({ filename: file_id }, function (err, fileToDeleteMfiles) {
        Mfiles.findByIdAndRemove(fileToDeleteMfiles._id, (err, file) => {
            if (err) return res.send(err);
        });
        Mchunks.findOne({ files_id: fileToDeleteMfiles._id }, function (err, fileToDeleteMChunks) {
            Mchunks.findByIdAndRemove(fileToDeleteMChunks._id, (err, filechunkdel) => {
                if (err) return res.send(err);
            });
        });
    });
}
