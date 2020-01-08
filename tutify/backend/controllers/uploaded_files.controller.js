const UploadedFiles = require('../models/models').UploadedFiles;
const Files = require('../models/models').Files;
const Tutor = require('../models/models').Tutor;
const Event = require('../models/models').Event;
var mongoose = require('mongoose');

exports.getUploadedFiles = async function (req, res) {
    let uploaded_files = new UploadedFiles();
    const { name, adminTutor, uploadedDocs } = req.body;
    const { filename } = req.file;
    const {_id }  = new mongoose.Types.ObjectId();

    var newEvents = [];
    var count = 0;

    uploaded_files.save(function (err) {

        UploadedFiles.findByIdAndUpdate(_id,
            {
                $set: {
                     "name": name, "adminTutor": adminTutor, "encryptedname": filename
                },
                $push: {
                    // for now, just added tests, will add actual id's eventually
                    "sharedToStudents": "test",
                    "sharedToCourses": "test2"
                }
            },
            { "new": true, "upsert": true },
            function (err, tutor) {
                if (err) throw err;
            });
    });

    res.redirect("/uploadingDocs" + req.body.name);
}

