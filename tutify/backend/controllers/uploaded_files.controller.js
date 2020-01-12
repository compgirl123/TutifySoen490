const UploadedFiles = require('../models/models').UploadedFiles;
const Files = require('../models/models').Files;
const Tutor = require('../models/models').Tutor;
const Course = require('../models/models').Course;
var mongoose = require('mongoose');

// This method fetches the latest uploaded document.
exports.getLatestUpload = async function (req, res) {
    UploadedFiles.findOne({ encryptedname: "2451d4f9d53678fba774c05738b234e4.png" }, function (err,mostRecent) {
        return res.json({ success: true, recent: mostRecent});
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
    if(name.split(".")[0].length > 25){
       name_new = name.substring(0,25)+"."+name.split(".")[1];
    }
    else{
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
                ,
                /*$push: {
                    // for now, just added tests, will add actual id's eventually
                    "sharedToStudents": [],
                    "sharedToCourses": []
                }*/
            },
            { "new": true, "upsert": true },
            function (err, tutor) {
                if (err) throw err;
            });
    });

    res.redirect("/uploadingDocs" + req.body.name);
}

// this method gets events from the database
exports.populateUploadedFiles = async function (req, res) {
    var tutor_id = 0;

    Object.keys(req.sessionStore.sessions).forEach(function (key) {
        var parsed_tutor_cookie = JSON.parse(req.sessionStore.sessions[key]);
        var parsed_tutor_info = parsed_tutor_cookie .userInfo;
        if (typeof parsed_tutor_info !== "undefined") {
            tutor_id = parsed_tutor_info._id;
        }
    });

    UploadedFiles.find({ adminTutor: tutor_id }, function (err, uploaded_docs) {
        return res.json({ success: true, file: uploaded_docs });
    });

};

// this method assigns a course to share the document to for tutors.
exports.assignCourse = async function (req, res) {
    let uploaded_files = new UploadedFiles();
    const {course_id,file_name} = req.body;
    console.log("BONJOOUUUURR   " + course_id);
    console.log("PIEEERRRREE    " + file_name);

    var up = 0;
    /*UploadedFiles.find({ encryptedname: file_name }, function (err, encrypted_file_name) {
        //console.log("FRANCE   " +encrypted_file_name._id);
        /*UploadedFiles.find({ _id: encrypted_file_name._id }, function (err, test) {
            console.log("England   " +test);
            //return res.json({ success: true, file: uploaded_docs });
        });
        //return res.json({ success: true, file: uploaded_docs });
    });*/

    //console.log(up);

    Course.findOne({ name: course_id }, function (err, course_name) {
        console.log("step 2"+course_name._id);
        UploadedFiles.findOne({ encryptedname: file_name }, function (err, encrypted_file_name) {
            console.log("FRANCE   " +encrypted_file_name._id);
            // Testing
            uploaded_files.save(function (err) {
            UploadedFiles.findByIdAndUpdate(encrypted_file_name._id,
                { "$push": {
                    "sharedToStudents": "test",
                    "sharedToCourses": course_name._id 
                } },
                { "new": true, "upsert": true },
                function (err, tutor) {
                    if (err) throw err;
                });
            });
            
            // Testing

            /*UploadedFiles.findByIdAndUpdate(encrypted_file_name._id,
                {
                    $push: {
                        // for now, just added tests, will add actual id's eventually
                        "sharedToStudents": "test",
                        "sharedToCourses": course_name._id
                    }
                },
                { "new": true, "upsert": true },
                function (err, tutor) {
                    if (err) throw err;
                });
           });*/
            /*UploadedFiles.find({ _id: encrypted_file_name._id }, function (err, test) {
                console.log("England   " +test);
                //return res.json({ success: true, file: uploaded_docs });
            });*/
            //return res.json({ success: true, file: uploaded_docs });
        });
       /*UploadedFiles.findByIdAndUpdate(course_name._id,
            {
                /*$set: {
                    "name": name_new,
                    "adminTutor": adminTutor,
                    "encryptedname": filename,
                    "link": "http://localhost:3000/document/" + filename,
                    "uploadDate": new Date()
                }
                $push: {
                    // for now, just added tests, will add actual id's eventually
                    "sharedToStudents": "test",
                    "sharedToCourses": course_name._id
                }
            },
            { "new": true, "upsert": true },
            function (err, tutor) {
                if (err) throw err;
            });*/
        //return res.json({ success: true, file: uploaded_docs });
        
    });
    //const { student_id, tutor_id } = req.body;
    /*Tutor.findByIdAndUpdate(tutor_id,
        { "$push": { "students": student_id } },
        { "new": true, "upsert": true },
        function (err, tutor) {
            if (err) throw err;

            Student.findByIdAndUpdate(student_id,
                { "$push": { "tutors": tutor_id } },
                { "new": true, "upsert": true },
                function (err, user) {
                    if (err) throw err;

                    //update the session
                    req.session.userInfo.tutors.push(tutor);
                    req.session.save(function (err) {
                        req.session.reload(function (err) {
                            // session reloaded
                        });
                    });
                }
            );
        }
    );*/
}

// this method deletes uploaded files from db.
exports.deleteUploadedFiles = async function (req, res) {
    // Will be doing in Iteration 8.
 };
