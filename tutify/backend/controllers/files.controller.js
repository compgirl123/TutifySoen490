const Files = require('../models/models').UploadedFiles;
const Mfiles = require('../models/models').Mfiles;
const Mchunks = require('../models/models').Mchunks;
const Tutor = require('../models/models').Tutor;

var mongoose = require('mongoose');

exports.getFile = async (req, res, next) => {

  // Retrieving the file information from the db (from uploads.files)
  await Mfiles.findOne({ filename: req.params.filename }, async (err, file) => {
    if (err) {
      console.error("Could not find the specified name by its file name");
      return await res.status(404).send({
        title: 'File error',
        message: 'Error finding file',
        error: err.errMsg
      });
    }
    if (!file || file.length === 0) {
      console.error("Could not download the file");
      return await res.status(500).send({
        title: 'Download Error',
        message: 'No file found'
      });
    } else {
      //Retrieving the chunks from the db (from uploads.chunks)       
      await Mchunks.find({ files_id: file._id }, async (err, chunks) => {
        var chunkArray = chunks;
        if (!chunkArray || chunkArray.length === 0) {
          console.error("Could not find the chunks data for the file");
          return await res.status(404).send({
            title: 'Download Error',
            message: 'No data found'
          });
        }

        //Concatinate the data in an array
        let fileData = [];
        for (let i = 0; i < chunkArray.length; i++) {
          fileData.push(chunkArray[i].data.toString('base64'));
        }
        //Display the chunks using the data URI format          
        let finalFile = 'data:' + file.contentType + ';base64,'
          + fileData.join('');


        // Find the initial name in uploaded_files
        await Files.findOne({ encryptedname: req.params.filename }, async (err, uploadedfile) => {
          if (err) {
            console.error("Could not find the specified filename in the database");
            return await res.status(500).send({
              title: 'File error',
              message: 'Error finding the file name',
              error: err.errMsg
            });

          } else {
            console.info("The file has been retrieved successfully");
            res.status(200).send({ data: finalFile, datatype: file.contentType, filename: uploadedfile.name });
          }
        });
      });
    }
  });
}

exports.deleteFile = async (req, res) => {
  gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
    if (err) {
      console.error("Could not find the file that needed to be deleted on the database");
      return res.status(500).json({ err: err.message });
    }
    console.info("The file has been deleted successfully");
    res.redirect("/uploadingDocs");
  });
}


exports.getPicture = async (req, res) => {

  // Retrieving the image information from the db (from uploads.files)
  await Mfiles.findOne({ filename: req.params.filename }, async (err, file) => {
    if (err) {
      console.error("Could not find the specified name by its file name");
      return await res.status(404).send({
        title: 'File error',
        message: 'Error finding file',
        error: err.errMsg
      });
    }
    if (!file || file.length === 0) {
      console.error("Could not download the file");
      return await res.status(500).send({
        title: 'Download Error',
        message: 'No file found'
      });
    } else {
      //Retrieving the chunks from the db (from uploads.chunks)       
      await Mchunks.find({ files_id: file._id }, async (err, chunks) => {
        var chunkArray = chunks;
        if (!chunkArray || chunkArray.length === 0) {
          console.error("Could not find the chunks data for the file");
          return await res.status(404).send({
            title: 'Download Error',
            message: 'No data found'
          });
        }

        //Concatinate the data in an array
        let fileData = [];
        for (let i = 0; i < chunkArray.length; i++) {
          fileData.push(chunkArray[i].data.toString('base64'));
        }
        //Display the chunks using the data URI format          
        let finalFile = 'data:' + file.contentType + ';base64,'
          + fileData.join('');


        res.status(200).send({ data: finalFile, datatype: file.contentType });
      });
    }
  });
}

// This function return the profile image for a tutor id
exports.getTutorPicture = async (req, res) => {

  Tutor.findOne({ _id: req.params.id }).
    exec(function (err, tutor) {
        if (err) return handleError(err);

        // Retrieving the image information from the db (from uploads.files)
        Mfiles.findOne({ filename: tutor.uploadedPicture.imgData }, async (err, file) => {
          if (err) {
            console.error("Could not find the specified name by its file name");
            return await res.status(404).send({
              title: 'File error',
              message: 'Error finding file',
              error: err.errMsg
            });
          }
          if (!file || file.length === 0) {
            console.error("Could not download the file");
            return await res.status(500).send({
              title: 'Download Error',
              message: 'No file found'
            });
          } else {
            //Retrieving the chunks from the db (from uploads.chunks)       
            Mchunks.find({ files_id: file._id }, async (err, chunks) => {
              var chunkArray = chunks;
              if (!chunkArray || chunkArray.length === 0) {
                console.error("Could not find the chunks data for the file");
                return await res.status(404).send({
                  title: 'Download Error',
                  message: 'No data found'
                });
              }

              //Concatinate the data in an array
              let fileData = [];
              for (let i = 0; i < chunkArray.length; i++) {
                fileData.push(chunkArray[i].data.toString('base64'));
              }
              //Display the chunks using the data URI format          
              let finalFile = 'data:' + file.contentType + ';base64,'
                + fileData.join('');

              res.status(200).send({ data: finalFile, datatype: file.contentType });
            });
          }
        });
    });  
}


