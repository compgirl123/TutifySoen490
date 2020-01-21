const UploadedFiles = require('../models/models').UploadedFiles;
const Course = require('../models/models').Course;
const Profile = require('../models/models').Profile;
const Mfiles = require('../models/models').Mfiles;
const Mchunks = require('../models/models').Mchunks;
var mongoose = require('mongoose');

// This method fetches the latest uploaded document.
exports.getLatestUpload = async function (req, res) {
    UploadedFiles.find({ adminTutor: req.session.userInfo._id }, function (err, mostRecent) {
        return res.json({ success: true, recent: mostRecent });
    }).sort({ _id: -1 }).limit(1);
}

// This method adds restriction information for uploaded documents.
exports.addUploadedFiles = async function (req, res) {
    let uploaded_files = new UploadedFiles();
    const { name, adminTutor } = req.body;
    const { filename } = req.file;
    const { _id } = new mongoose.Types.ObjectId();

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
                    "link": "/document/" + filename,
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
    UploadedFiles.find({ adminTutor: req.session.userInfo._id }, function (err, uploaded_docs) {
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
    const { id_student, file_name } = req.body;
    Profile.findOne({ _id: id_student }, function (err, student_info) {
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
    var response = [];
    await Profile.findOne({ account: req.session.userInfo.account }, async (err, sharedDocs) => { }).then(async (sharedDocs) => {
        await UploadedFiles.find({ _id: { $in: sharedDocs.sharedToStudents } }, async (err, tst) => { }).then(async (tst) => {
            await findProfile(tst, response, res).then(async (result) => {
                return res.json({ success: true, file: result });
            });
        });
    });
}

//helper method
async function findProfile(tst, response, res) {
    for (let index = 0; index < tst.length; index++) {
        await Profile.findOne({ _id: tst[index].adminTutor }, async (err, tutor) => { }).then(async (tutor) => {
            var tutorName = tutor.first_name + " " + tutor.last_name
            tst[index] = await Object.assign({ tutorName: tutorName }, tst[index]);
            await response.push(tst[index]);
        });
    };
    return new Promise((resolve, reject) => { resolve(response) });
}

// this method enables each class to view all of their shared documents.
exports.viewCourseDocs = async function (req, res) {
    var r = /\d+/;
    var matchCourseId = req.headers.referer.match(/.*\/(.*)$/)[1];
    Course.findOne({ _id: matchCourseId }, function (err, course_info) {
        UploadedFiles.find({ _id: { $in: course_info.sharedToCourses } }).populate('sharedToCourses').
            exec(function (err, course_) {
                return res.json({ success: true, file: course_ });
            });
    })
}

// this method enables each class to view all of their shared documents.
exports.viewSpecificStudentFiles = async function (req, res) {
    var student_id_position = req.headers.referer.lastIndexOf("/");
    var student_id = req.headers.referer.substring(student_id_position + 1, req.headers.referer.length)
    Profile.findOne({ _id: student_id }, function (err, student_info) {
        if (student_info !== undefined) {
            UploadedFiles.find({ _id: { $in: student_info.sharedToStudents }, adminTutor: req.session.userInfo._id }, function (err, individualDocsShared) {
                return res.json({ success: true, fileViewTutors: individualDocsShared });
            });
        }
    });
}

// this method enables each class to view all of their shared documents.
exports.deleteFiles = async function (req, res) {
    const { file_id } = req.body;
    UploadedFiles.find({ encryptedname: { $in: file_id } }, function (err, fileToDelete) {
        fileToDelete.forEach(function (err, studentShared) {
            if ((fileToDelete[studentShared].sharedToStudents).length !== 0) {
                fileToDelete[studentShared].sharedToStudents.forEach(function (err, studentIndex) {
                    Profile.find({ _id: { $in: fileToDelete[studentShared].sharedToStudents[studentIndex] } }, function (err, userfiles) {
                        userfiles.forEach(function (err, studentIndex1) {
                            if ((userfiles[studentIndex1].sharedToStudents).indexOf(fileToDelete[studentShared]._id) > -1) {
                                Profile.findByIdAndUpdate(fileToDelete[studentShared].sharedToStudents[studentIndex],
                                    { "$pull": { "sharedToStudents": fileToDelete[studentShared]._id } },
                                    function (err, student) {
                                        if (err) throw err;
                                    });
                            }
                        });
                    });
                });
            }
            if ((fileToDelete[studentShared].sharedToCourses).length !== 0) {
                fileToDelete[studentShared].sharedToCourses.forEach(function (err, courseIndex) {
                    Course.find({ _id: { $in: fileToDelete[studentShared].sharedToCourses[courseIndex] } }, function (err, userfiles1) {
                        userfiles1.forEach(function (err, studentIndex2) {
                            if ((userfiles1[studentIndex2].sharedToCourses).indexOf(fileToDelete[studentShared]._id) > -1) {
                                Course.findByIdAndUpdate(fileToDelete[studentShared].sharedToCourses[courseIndex],
                                    { "$pull": { "sharedToCourses": fileToDelete[studentShared]._id } },
                                    function (err, student) {
                                        if (err) throw err;
                                    });
                            }
                        });
                    });
                });
            }

            UploadedFiles.findByIdAndRemove(fileToDelete[studentShared]._id, (err, file) => {
                if (err) return res.send(err);
            });
        });
    });

    Mfiles.find({ filename: { $in: file_id } }, function (err, fileToDeleteMfiles) {
        fileToDeleteMfiles.forEach(function (err, courseIndex) {
            Mfiles.findByIdAndRemove(fileToDeleteMfiles[courseIndex]._id, (err, file) => {
                if (err) return res.send(err);
            });
            Mchunks.find({ files_id: fileToDeleteMfiles[courseIndex]._id }, function (err, fileToDeleteMChunks) {
                fileToDeleteMChunks.forEach(function (err, removechunkindex) {
                    Mchunks.findByIdAndRemove(fileToDeleteMChunks[removechunkindex]._id, (err, filechunkdel) => {
                        if (err) return res.send(err);
                    })
                }
                );
            });
        });
    });
}

// this method enables each class to view all of their shared documents.
exports.deleteSpecificStudentsFiles = async function (req, res) {
    const { file_id } = req.body;
    var r = /\d+/;
    var matchCourseId = req.headers.referer.match(/.*\/(.*)$/)[1];
    UploadedFiles.find({ encryptedname: { $in: file_id } }, function (err, fileToDelete) {
        fileToDelete.forEach(function (err, studentIndex) {
            Profile.findByIdAndUpdate(matchCourseId,
                { "$pull": { "sharedToStudents": fileToDelete[studentIndex]._id } },
                function (err, student) {
                    if (err) throw err;
                });
            UploadedFiles.findByIdAndUpdate(fileToDelete[studentIndex]._id,
                { "$pull": { "sharedToStudents": matchCourseId } },
                function (err, student) {
                    if (err) throw err;
                });
        });
    });
}

// this method enables the deletion of specific course files in each course
exports.deleteSpecificCourseFiles = async function (req, res) {
    const { file_id } = req.body;
    var r = /\d+/;
    var matchCourseId = req.headers.referer.match(/.*\/(.*)$/)[1];
    UploadedFiles.find({ encryptedname: { $in: file_id } }, function (err, fileToDelete) {
        fileToDelete.forEach(function (err, studentIndex) {
            Course.findByIdAndUpdate(matchCourseId,
                { "$pull": { "sharedToCourses": fileToDelete[studentIndex]._id } },
                function (err, student) {
                    if (err) throw err;
                });
            UploadedFiles.findByIdAndUpdate(fileToDelete[studentIndex]._id,
                { "$pull": { "sharedToCourses": matchCourseId } },
                function (err, student) {
                    if (err) throw err;
                });
        });
    });
}
