// import FilePage from "../../src/components/FilePage"
const Files = require('../models/models').Files;
const Mfiles = require('../models/models').Mfiles;
const Mchunks = require('../models/models').Mchunks;

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
  // Mfiles.find({}, (err, files) => {
  //   if (!files || files.length === 0) {
  //     return res.status(404).json({
  //       err: "no files exist"
  //     });
  //   }
  //   res.render('Main', {
  //     files: files,
  //     success: true
  //   });  
  // });
}





exports.getFile = (req, res) => {  

  Mfiles.findOne({filename: req.params.filename}, (err, file) => {        
      if(err){        
        return res.render('index', {
         title: 'File error', 
         message: 'Error finding file', 
          error: err.errMsg});      
      }
    if(!file || file.length === 0){        
      return res.render('index', {
       title: 'Download Error', 
       message: 'No file found'});      
     }else{

     //Retrieving the chunks from the db          
     Mchunks.find({files_id : file._id},(err, chunks)=>{
       var chunkArray = chunks;
       if(!chunkArray || chunkArray.length === 0){            
              //No data found            
              return res.render('index', {
                 title: 'Download Error', 
                 message: 'No data found'});          
            }

        let fileData = [];          
      for(let i=0; i<chunkArray.length;i++){            
        //This is in Binary JSON or BSON format, which is stored               
        //in fileData array in base64 endocoded string format               
       
        fileData.push(chunkArray[i].data.toString('base64'));          
      }
      console.warn("Get ready!");
       //Display the chunks using the data URI format          
       let finalFile = 'data:' + file.contentType + ';base64,' 
            + fileData.join(''); 
        console.warn("Gone through: final file");
        console.warn(finalFile);
        console.warn("DONE!");
        return finalFile;         
       
       console.warn("Gone through");
      });  
     
    //    .sort({n: 1}).toArray(function(err, chunks){          
    //      if(err){            
    //         return res.render('index', {
    //          title: 'Download Error', 
    //          message: 'Error retrieving chunks', 
    //          error: err.errmsg});          
    //       }
    //     if(!chunks || chunks.length === 0){            
    //       //No data found            
    //       return res.render('index', {
    //          title: 'Download Error', 
    //          message: 'No data found'});          
    //     }
      
    //   let fileData = [];          
    //   for(let i=0; i<chunks.length;i++){            
    //     //This is in Binary JSON or BSON format, which is stored               
    //     //in fileData array in base64 endocoded string format               
       
    //     fileData.push(chunks[i].data.toString('base64'));          
    //   }
      
    //    //Display the chunks using the data URI format          
    //    let finalFile = 'data:' + docs[0].contentType + ';base64,' 
    //         + fileData.join('');          
    //     res.render('imageView', {
    //        title: 'Image File', 
    //        message: 'Image loaded from MongoDB GridFS', 
    //        imgurl: finalFile});
    //    });      
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
    
exports.downloadFile = (req, res) => {
  var filename = req.params.filename;
  res.download(uploadFolder + filename);  
}
// this method fetches all files accounts in our database
// exports.getFiles = async function (req, res) {
//   Mfiles.find((err, data) => {
//       if (err) return res.json({ success: false, error: err });
//       return res.json({ success: true, data: data });
//     });
// }


