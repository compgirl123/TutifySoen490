const UploadedFiles = require('../models/models').UploadedFiles;
const Course = require('../models/models').Course;
const Profile = require('../models/models').Profile;
const Mfiles = require('../models/models').Mfiles;
const Mchunks = require('../models/models').Mchunks;
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

// This method fetches the latest uploaded document.
exports.getLatestUpload = async function (req, res) {
    UploadedFiles.find({ adminTutor: req.session.userInfo._id }, function (err, mostRecent) {
        if (err) {
            console.error("Was not able to fetch the latest uploaded file");
            return res.json({ success: false, error: err });
        }
        console.info("Latest uploaded file found");
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
        if (err) {
            console.error("The UploadedFiles model was not able to be created");
        }
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
                if (err) {
                    console.error("The uploaded file was unable to be updated in the database");
                    throw err;
                }
                else {
                    console.info("The file was uploaded successfully");
                }
            });
    });

    res.redirect("/uploadingDocs" + req.body.name);
}

// This Method Gets the Document Files from the Database
exports.populateUploadedFiles = async function (req, res) {
    UploadedFiles.find({ adminTutor: req.session.userInfo._id }, function (err, uploaded_docs) {

        if (err) {
            console.error("The uploaded files were not found to be populated");
            throw err;
        }
        else {
            console.info("THe files for population have been found");
        }
        return res.json({ success: true, file: uploaded_docs });
    });
};

// this method enables the tutor to share their uploaded documents to their courses.
exports.assignCourse = async function (req, res) {
    let course = new Course();
    const { course_id, file_name } = req.body;

    Course.findOne({ name: course_id }, function (err, course_name) {
        UploadedFiles.findOne({ encryptedname: file_name }, function (err, encrypted_file_name) {
            if (err) {
                console.error("The uploaded files were not found for course assignation");
                throw err;
            }
            UploadedFiles.findByIdAndUpdate(encrypted_file_name._id,
                {
                    "$push": {
                        "sharedToCourses": course_name._id
                    }
                },
                { "new": true, "upsert": true },
                function (err, tutor) {
                    if (err) {
                        console.error("The uploaded files sharing list was unable to be updated");
                        throw err;
                    }
                    else {
                        console.info("The uploaded files sharing list has been updated");
                    }
                });
            Course.findByIdAndUpdate(course_name._id,
                {
                    "$push": {
                        "sharedToCourses": encrypted_file_name._id
                    }
                },
                { "new": true, "upsert": true },
                function (err, tutor) {
                    if (err) {
                        console.error("The uploaded files sharing list was unable to be updated");
                        throw err;
                    }
                    else {
                        console.info("The uploaded files sharing list has been updated");
                    }
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
                        if (err) {
                            console.error("The uploaded files sharing list was unable to be updated");
                            throw err;
                        }
                        else {
                            console.info("The uploaded files sharing list has been updated");
                        }
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
                        if (err) {
                            console.error("The uploaded files sharing list was unable to be updated");
                            throw err;
                        }
                        else {
                            console.info("The uploaded files sharing list has been updated");
                        }
                    });
            });
        });
    });
}

// this method enables the students to view all of their shared documents.
exports.viewDocs = async function (req, res) {
    var response = [];
    await Profile.findOne({ account: req.session.userInfo.account }, async (err, sharedDocs) => { if (err) { console.error("Unable to find the user to view his/her files"); } }).then(async (sharedDocs) => {
        await UploadedFiles.find({ _id: { $in: sharedDocs.sharedToStudents } }, async (err, tst) => { if (err) { console.error("Unable to find the user's files"); } }).then(async (tst) => {
            await findProfile(tst, response, res).then(async (result) => {
                console.info("The user's list of documents has been retrieved successfully");
                return res.json({ success: true, file: result });
            });
        });
    });
}

// helper method
async function findProfile(tst, response, res) {
    for (let index = 0; index < tst.length; index++) {
        await Profile.findOne({ _id: tst[index].adminTutor }, async (err, tutor) => { if (err) { console.error("Unable to find the user "); } }).then(async (tutor) => {
            var tutorName = tutor.first_name + " " + tutor.last_name
            tst[index] = await Object.assign({ tutorName: tutorName }, tst[index]);
            await response.push(tst[index]);
        });
    };
    return new Promise((resolve, reject) => { resolve(response) });
}

// this method enables for the viewing of all course docs.
exports.viewCourseDocs = async function (req, res) {
    var r = /\d+/;
    var matchCourseId = req.headers.referer.match(/.*\/(.*)$/)[1];
    Course.findOne({ _id: matchCourseId }, function (err, course_info) {
        if (err) {
            console.error("Unable to find the course to find the associated docs");
            throw err;
        }
        UploadedFiles.find({ _id: { $in: course_info.sharedToCourses } }).populate('sharedToCourses').
            exec(function (err, course_) {
                if (err) {
                    console.error("Unable to find the course to find the associated docs");
                    res.json({ success: false, error: err });
                }
                else {
                    console.info("The course's document list has been retrieved successfully");
                    return res.json({ success: true, file: course_ });
                }

            });
    })
}

// this method enables each student to view all of their shared documents.
exports.viewSpecificStudentFiles = async function (req, res) {
    var student_id_position = req.headers.referer.lastIndexOf("/");
    var student_id = req.headers.referer.substring(student_id_position + 1, req.headers.referer.length)
    Profile.findOne({ _id: student_id }, function (err, student_info) {
        if (err) {
            console.error("Unable to find the student profile to view his/her shared files");
            res.json({ success: false, error: err });
        }
        if (student_info !== undefined) {
            UploadedFiles.find({ _id: { $in: student_info.sharedToStudents }, adminTutor: req.session.userInfo._id }, function (err, individualDocsShared) {
                console.info("Found the student's shared files successfully");
                return res.json({ success: true, fileViewTutors: individualDocsShared });
            });
        }
    });
}

// this method enables the tutor to delete some of their shared files in all places.
exports.deleteFiles = async function (req, res) {
    const { file_id } = req.body;
    // Finding Uploaded File Documents to Delete. 
    UploadedFiles.find({ encryptedname: { $in: file_id } }, function (err, fileToDelete) {
        if (err) {
            console.error("Could not find the file that needed to be deleted on the database");
            return res.status(500).json({ err: err.message });
        }

        fileToDelete.forEach(function (err, studentShared) {
            // Removing Shared to certain Students of Document if the document(s) was shared to student(s)
            if ((fileToDelete[studentShared].sharedToStudents).length !== 0) {
                fileToDelete[studentShared].sharedToStudents.forEach(function (err, studentIndex) {
                    Profile.find({ _id: { $in: fileToDelete[studentShared].sharedToStudents[studentIndex] } }, function (err, userfiles) {
                        userfiles.forEach(function (err, studentIndex1) {
                            if ((userfiles[studentIndex1].sharedToStudents).indexOf(fileToDelete[studentShared]._id) > -1) {
                                Profile.findByIdAndUpdate(fileToDelete[studentShared].sharedToStudents[studentIndex],
                                    { "$pull": { "sharedToStudents": fileToDelete[studentShared]._id } },
                                    function (err, student) {
                                        if (err) {
                                            console.error("Unable to delete the file reference of the profile object");
                                            throw err;
                                        }
                                    });
                            }
                        });
                    });
                });
            }
            // Removing Shared to certain Courses of Document if the document(s) was shared to student(s)
            if ((fileToDelete[studentShared].sharedToCourses).length !== 0) {
                fileToDelete[studentShared].sharedToCourses.forEach(function (err, courseIndex) {
                    Course.find({ _id: { $in: fileToDelete[studentShared].sharedToCourses[courseIndex] } }, function (err, userfiles1) {
                        userfiles1.forEach(function (err, studentIndex2) {
                            if ((userfiles1[studentIndex2].sharedToCourses).indexOf(fileToDelete[studentShared]._id) > -1) {
                                Course.findByIdAndUpdate(fileToDelete[studentShared].sharedToCourses[courseIndex],
                                    { "$pull": { "sharedToCourses": fileToDelete[studentShared]._id } },
                                    function (err, student) {
                                        if (err) {
                                            console.error("Could not remove the file reference from the course object");
                                            throw err;
                                        }
                                    });
                            }
                        });
                    });
                });
            }
            // Removing uploaded Document from the uploaded files collection.
            UploadedFiles.findByIdAndRemove(fileToDelete[studentShared]._id, (err, file) => {
                if (err) {
                    console.error("Could not find the file that needed to be deleted on the database");
                    return res.status(404).json({ err: err.message });
                }
                console.info("The file has been deleted successfully");
            });
        });
    });
    // Removing Multer file(s) from Multer collection
    Mfiles.find({ filename: { $in: file_id } }, function (err, fileToDeleteMfiles) {
        if (err) {
            console.error("Could not find the multer file object");
            return res.send(err);
        }
        fileToDeleteMfiles.forEach(function (err, courseIndex) {
            Mfiles.findByIdAndRemove(fileToDeleteMfiles[courseIndex]._id, (err, file) => {
                if (err) {
                    console.error("Could not remove multer file object");
                    return res.send(err);
                }
            });
            // Removing all related chunks to deleted files from the Chunks collection
            Mchunks.find({ files_id: fileToDeleteMfiles[courseIndex]._id }, function (err, fileToDeleteMChunks) {
                if (err) {
                    console.error("Could not find the chunks of the files that need to be deleted");
                    throw err
                }
                fileToDeleteMChunks.forEach(function (err, removechunkindex) {
                    Mchunks.findByIdAndRemove(fileToDeleteMChunks[removechunkindex]._id, (err, filechunkdel) => {
                        if (err) {
                            console.error("Could not delete chunks");
                            return res.send(err);
                        }
                        console.info("File chunks deleted successfully");
                    })
                }
                );
            });
        });
    });
}

// this method enables the deletion of specific student files for each specific student(s).
exports.deleteSpecificStudentsFiles = async function (req, res) {
    const { file_id } = req.body;
    var r = /\d+/;
    var matchCourseId = ObjectId(req.headers.referer.match(/.*\/(.*)$/)[1]);
    UploadedFiles.find({ encryptedname: { $in: file_id } }, function (err, fileToDelete) {
        if (err) {
            console.error("Could not find the uploaded files to delete");
            throw err;
        }
        fileToDelete.forEach(function (err, studentIndex) {
            Profile.findByIdAndUpdate(matchCourseId,
                { "$pull": { "sharedToStudents": ObjectId(fileToDelete[studentIndex]._id)} },
                function (err, student) {
                    if (err) {
                        console.error("Could not remove the file reference from the profile object");
                        throw err;
                    }
                });
            UploadedFiles.findByIdAndUpdate(fileToDelete[studentIndex]._id,
                { "$pull": { "sharedToStudents": matchCourseId } },
                function (err, student) {
                    if (err) {
                        console.error("Could not delete the link between the student and the shared file");
                        throw err;
                    }
                    else {
                        console.info("Deleted the specific student file successfully")
                    }
                });
        });
    });
}

// this method enables the deletion of specific course files in each course
exports.deleteSpecificCourseFiles = async function (req, res) {
    const { file_id } = req.body;
    var r = /\d+/;
    var matchCourseId = ObjectId(req.headers.referer.match(/.*\/(.*)$/)[1]);
    UploadedFiles.find({ encryptedname: { $in: file_id } }, function (err, fileToDelete) {
        if (err) {
            console.error("Unable to find the uploaded file based of its encrypted name");
            throw err;
        }
        fileToDelete.forEach(function (err, studentIndex) {
            Course.findByIdAndUpdate(matchCourseId,
                { "$pull": { "sharedToCourses": fileToDelete[studentIndex]._id } },
                function (err, student) {
                    if (err) {
                        console.error("Unable to delete the file reference from the course's file list");
                        throw err;
                    }

                });
            UploadedFiles.findByIdAndUpdate(fileToDelete[studentIndex]._id,
                { "$pull": { "sharedToCourses": matchCourseId } },
                function (err, course_) {
                    if (err) {
                        console.error("Unable to find the file associated with the file");
                    }
                    else {
                        console.info("The course file has been deleted successfully");
                    }
                });
        });
    });
}