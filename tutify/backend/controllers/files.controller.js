const Files = require('../models/models').Files;
// var multer = require('multer');
var mongoose = require('mongoose');
// var uuidv4 = require('uuid/v4');
// var bp = require("body-parser");
// const DIR = './../public/';
// const path = require("path");
// const GridFsStorage = require("multer-gridfs-storage");



// exports.downloadFile = async (req, res) => {
//    // console.log('id', req.params.id)
//   //  return gfs
//   //  .find({
//   //    filename: req.params.filename
//   //  })
//   //  .toArray((err, files) => {
//   //    if (!files || files.length === 0) {
//   //      return res.status(404).json({
//   //        err: "no files exist"
//   //      });
//   //    }
//   //    gfs.openDownloadStreamByName(req.params.filename).pipe(res);
//   //  });
//   // var conn = mongoose.connection;
//   // var gfs = Grid(conn.db, mongoose.mongo);
//   console.error("I AM HERE NYAAAA <3");
//   gfs.findOne({ _id: req.params.id, root: 'resume' }, function (err, file) {
//     if (err) {
//         return res.status(400).send(err);
//     }
//     else if (!file) {
//         return res.status(404).send('Error on the database looking for the file.');
//     }

//     res.set('Content-Type', file.contentType);
//     res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');

//     var readstream = gfs.createReadStream({
//       _id: req.params.id,
//       root: 'resume'
//     });

//     readstream.on("error", function(err) { 
//         res.end();
//     });
//     readstream.pipe(res);
//   });
// }
exports.createFile = async function (req, res) {
  const { tutor_id, course_id, file_id, name , type} = req.body;

  let newFile = {
      course: course_id,
      tutor: tutor_id,
      name: name,
      type: type
  }
  let createFile
  Files.findOne({ _id: tutor_id }).then(tutor => {
      // Add student to list for the specific course
      tutor.courses.forEach((course) => {
          if (course.course == course_id) {
              course.students.push(student_id)
          }
      });
      tutor.save();

      // Student side
      Student.findByIdAndUpdate(student_id,
          { "$push": { "courses": newFile } },
          { "new": true, "upsert": true },
          function (err, user) {
              if (err) throw err;

              //update the session
              req.session.userInfo.courses.push(newFile);
              req.session.save(function (err) {
                  req.session.reload(function (err) {
                      // session reloaded
                  });
              });
          }
      );
  }).catch(err => {
      console.log(err)
  });
}
exports.getFiles = (req, res) => {
  if(!gfs) {
    console.log("some error occured, check connection to db");
    res.send("some error occured, check connection to db");
    process.exit(0);
  }
  gfs.find().toArray((err, files) => {
    // check if files
    if (!files || files.length === 0) {
      return res.render("index", {
        files: false
      });
    } else {
      const f = files
        .map(file => {
          if (
            file.contentType === "image/png" ||
            file.contentType === "image/jpeg"
          ) {
            file.isImage = true;
          } else {
            file.isImage = false;
          }
          return file;
        })
        .sort((a, b) => {
          return (
            new Date(b["uploadDate"]).getTime() -
            new Date(a["uploadDate"]).getTime()
          );
        });

      return res.render("index", {
        files: f
      });
    }
  });
}

exports.deleteFile = async (req, res) => {
  gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
    if (err) {
      return res.status(404).json({ err: err.message });
    }
    res.redirect("/uploadingDocs");
  });
}

exports.uploadFile = async (req, res, next) => {

  // const url = req.protocol + '://' + req.get('host');
  // const file = new Files();
  // //console.log(req.body);
  // file.name = req.body.name;
  // file.adminTutor = req.body.adminTutor;
  // file.url = "http://localhost:3000/"+req.file.filename;
  // file.encryptedName = req.file.filename;
  // file.save().then(result => {
  //     res.status(201).json({
  //         message: "File uploaded successfully!",
  //         fileCreated: {
  //             _id: result._id,
  //             file: result.file
  //         }
  //     })
  // }).catch(err => {
  //     console.log(err),
  //         res.status(500).json({
  //             error: err
  //         });
  // });

    
}
exports.downloadFile = (req, res) => {
  var filename = req.params.filename;
  res.download(uploadFolder + filename);  
}
// this method fetches all files accounts in our database
exports.getFiles = async function (req, res) {
  Files.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
}

// this method fetches all files accounts in our database
exports.uploadFiles = async function (req, res) {
  Files.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
}


