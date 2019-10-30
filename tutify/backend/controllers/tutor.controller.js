const Tutor = require('../models/models').Tutor;

// this method fetches all available tutors in our database
exports.getTutor = async function (req, res) {
    Tutor.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
};

// this method overwrites existing tutor in our database
exports.updateTutor = async function (req, res) {
    const { _id, subjects } = req.body;
    console.log("HIII");
    console.log(subjects);
    /*Tutor.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });*/

   Tutor.findByIdAndUpdate(_id,
        { "$push": {"subjects": subjects } },
        { "new": true, "upsert": true },
        function (err) {
            if (err) throw err;
        }
    );
};