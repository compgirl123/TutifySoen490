
const Files = require('../models/models').Files;
var multer = require('multer');
var mongoose = require('mongoose');
var uuidv4 = require('uuid/v4');
var bp = require("body-parser");
const DIR = './../public/';
const crypto = require("crypto");
const path = require("path");
const GridFsStorage = require("multer-gridfs-storage");



  // DB
  const mongoURI = "mongodb+srv://app:Mdfi8g6IMFagCOOE@tutify-q6b06.mongodb.net/tutify?retryWrites=true&w=majority";

  // connection
  const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  let gfs;
  conn.once("open", () => {
    // init stream
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "uploads"
    });
  });
  
  // Storage
  const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "uploads"
          };
          resolve(fileInfo);
        });
      });
    }
  });

  exports.upload = multer({
    storage
  });

exports.downloadFile = async (req, res) => {
   // console.log('id', req.params.id)
   const file = gfs
   .find({
     filename: req.params.filename
   })
   .toArray((err, files) => {
     if (!files || files.length === 0) {
       return res.status(404).json({
         err: "no files exist"
       });
     }
     gfs.openDownloadStreamByName(req.params.filename).pipe(res);
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
    if (err) return res.status(404).json({ err: err.message });
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


