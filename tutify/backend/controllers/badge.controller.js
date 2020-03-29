const Badges = require('../models/models').Badges;
const Mfiles = require('../models/models').Mfiles;
const Mchunks = require('../models/models').Mchunks;
const Student = require('../models/models').Student;

//this method get all badges from the db
exports.getBadges = async (req, res) => {
    var finalFiles = [];
    var count = 0;

    Badges.find((err, badges) => {

        if (err) return res.json({ success: false, error: err });


        badges.forEach((badge) => {
            // Retrieving the image information from the db (from uploads.files)
            Mfiles.findOne({ filename: badge.imageData }, async (err, file) => {
                if (err) {
                    console.error("Could not find the specified name by its file name");
                    return res.status(404).send({
                        title: 'File error',
                        message: 'Error finding file',
                        error: err.errMsg
                    });
                }
                if (!file || file.length === 0) {
                    console.error("Could not download the file");
                    return res.status(500).send({
                        title: 'Download Error',
                        message: 'No file found'
                    });
                } else {
                    //Retrieving the chunks from the db (from uploads.chunks)
                    Mchunks.find({ files_id: file._id }, async (err, chunks) => {
                        var chunkArray = chunks;
                        if (!chunkArray || chunkArray.length === 0) {
                            console.error("Could not find the chunks data for the file");
                            return res.status(404).send({
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
                        let data = {
                            badge: badge,
                            finalFile: finalFile
                        }
                        finalFiles.push(data);
                        count++;
                        if (count == badges.length) {
                            return res.json({ success: true, data: finalFiles });
                        }

                    });
                }
            });
        });
    });
};


// this method unlocks a badge
exports.unlockBadge = async function (req, res) {
    const { student_id, badge_id, totalPoints } = req.body;

    Student.update({ "_id": student_id, "badgeDiscriminator.badgeId": badge_id },
        { "$set": { "badgeDiscriminator.$.enable": 1 } },
        { "new": true, "upsert": true },
        function (err, student) {
            if (err) {
                console.error("Unable to delete the file reference from the course's file list");
                throw err;
            }

            Student.findByIdAndUpdate(student_id,
                { $set: { "totalPoints": totalPoints } },
                { "new": true, "upsert": true },
                function (err, student) {
                    if (err) {
                        console.error("Unable to delete the file reference from the course's file list");
                        throw err;
                    }
                    req.session.userInfo.totalPoints = totalPoints;
                    req.session.userInfo.badgeDiscriminator = student.badgeDiscriminator;
                    req.session.save();

                    return res.json({ success: true, data: student });

                });

        });

};
