const UploadedFiles = require('../models/models').UploadedFiles;
const Files = require('../models/models').Files;
const Tutor = require('../models/models').Tutor;
const Event = require('../models/models').Event;

// this method creates a new db containing the information for uploaded files.
exports.getUploadedFiles = async function (req, res) {
    let uploadedFiles = new UploadedFiles();
    const { name, adminTutor, uploadedDocs } = req.body;
    
    // Getting non encrypted name for file
    //console.log("test" + name);
    // Getting the tutor id that uploaded the file
    //console.log("test2" + adminTutor);
       // Basing myself off event creation (for now) for upload documents sharing setting.
       // Fix this in the future for upload documents
        //const { eventa, tutor_id, description, location, date, startTime, endTime } = req.body;
       
        let event = new Event();
        var newEvents = [];
        var count = 0;
    
        //create event
        /*event.description = description;
        event.location = location;
        event.date = date;
        event.startTime = startTime;
        event.endTime = endTime;*/
    
        event.save(function (err, eve) {
            if (err) return res.json({ success: false, error: err });
            //console.log(eve);
            //events.push(eve._id);
            //uploadedDocs.push("DD");
            //events.push(eve._id);// empty array fix
            console.log("HEYY");
            console.log(adminTutor);
            console.log("HOW RU");
            console.log(eve._id);
            if (eve._id == null) { // if todo doesnt have an object id, generate one
                eve._id = new mongoose.Types.ObjectId();
            }
            // adminTutor.id
            UploadedFiles.findByIdAndUpdate(eve._id,
                //{ "$push": { "name": "Test" } },
                {$set: {
                    "name": name, "adminTutor":adminTutor, "_id" : eve._id
                }},
                { "new": true, "upsert": true },
                function (err, tutor) {
                    if (err) throw err;
    
                    //update the session
                    req.session.userInfo.events = tutor.events;
                    req.session.save(function (err) {
                        req.session.reload(function (err) {
                            // session reloaded
                        });
    
                        /*events.forEach(function (event) {
                            Event.findOne({ _id: event }, function (err, event) {
                                if (err) {
    
                                };
                                newEvents.push(event);
                                count++;
    
                                if (count == events.length) {
    
                                    return res.json({ success: true, data: newEvents });
                                }
    
                            });
                        });*/
                    });
                });
        });
    

    res.redirect("/uploadingDocs" + req.body.name);
}

