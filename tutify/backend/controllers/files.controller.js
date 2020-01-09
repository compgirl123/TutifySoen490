const Files = require('../models/models').Files;
const Mfiles = require('../models/models').Mfiles;
const Mchunks = require('../models/models').Mchunks;

var mongoose = require('mongoose');

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





exports.getFile = async (req, res, next) => {  

  // Retrieving the file information from the db (from uploads.files)
  await Mfiles.findOne({filename: req.params.filename}, async (err, file) => {        
    if(err){    
      response = "File Error";     
         
      return await res.status(500).send({
        title: 'File error', 
        message: 'Error finding file', 
        error: err.errMsg});      
    }
    if(!file || file.length === 0){     
      response = "Download Error";   
        
      return await res.status(500).send({
       title: 'Download Error', 
       message: 'No file found'});      
     }else{
      //Retrieving the chunks from the db (from uploads.chunks)       
      await Mchunks.find({files_id : file._id}, async (err, chunks)=>{
        var chunkArray = chunks;
        if(!chunkArray || chunkArray.length === 0){   
          response = "Download Error";          
          //No data found            
          return await res.status(500).send({
            title: 'Download Error', 
            message: 'No data found'});          
        }

        //Concatinate the data in an array
        let fileData = [];          
        for(let i=0; i<chunkArray.length;i++){            
         fileData.push(chunkArray[i].data.toString('base64'));          
        }
        //Display the chunks using the data URI format          
        let finalFile = 'data:' + file.contentType + ';base64,' 
              + fileData.join(''); 
        response = finalFile;   
        

        // Find the initial name in uploaded_files
        await Files.findOne({encryptedname : req.params.filename}, async (err, uploadedfile) => {
          if(err){    
            response = "File name Error";     
                
            return await res.status(500).send({
              title: 'File error', 
              message: 'Error finding the file name', 
              error: err.errMsg});      
               
          }else{
            res.status(200).send({data:finalFile, datatype:file.contentType, filename:uploadedfile.name});
          }
        }); 

      
      
      
      
      
      
      
      
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
    
exports.downloadFile = (req, res) => {
  var filename = req.params.filename;
  res.download(uploadFolder + filename);  
}


