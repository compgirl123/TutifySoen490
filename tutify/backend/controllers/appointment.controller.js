const Appointment = require('../models/models').Appointment;

// this method fetches all available appointments in our database
exports.getAppointment = async function (req, res) {
    Appointment.find((err, data) => {
      if (err) {
          console.error("The appointment was not found");
          return res.json({ success: false, error: err });
        }
        console.info("The appointment was found");
      return res.json({ success: true, data: data });
    });
};

// this method overwrites existing appointment in our database
exports.updateAppointment = async function (req, res) {
    const { id, update } = req.body;
    Appointment.findByIdAndUpdate(id, update, (err) => {
        if (err) {
            console.error("The appointment could not update. Make sure it actually exists.");
            return res.json({ success: false, error: err });
        
        }
        console.info("The appointment has been updated successfully");
        return res.json({ success: true });
    });
};

// this method adds new appointment in our database
exports.putAppointment = async function (req, res) {
    let data = new Appointment();

    const { id, message } = req.body;

    if ((!id && id !== 0) || !message) {
        console.error("The appointment was not created as some inputs are wrong/missing");
        return res.json({
        success: false,
        error: 'INVALID INPUTS',
        });
    }
    data.message = message;
    data.id = id;
    data.save((err) => {
        if (err) {
            console.error("The database did not save the appointment, probably due to connection or call request problems");
            return res.json({ success: false, error: err });
        }
        console.info("The appointment was saved successfully to the database");
        return res.json({ success: true });
    });
};

// this method removes existing appointment in our database
exports.deleteAppointment = async function (req, res) {
    const { id } = req.body;
    Appointment.findByIdAndRemove(id, (err) => {
        if (err) {
            console.error("The delete order was given, but was not executed by the database. This may be due to a connection error.");
            return res.send(err);
        }
        console.info("The appointment has been deleted");
        return res.json({ success: true });
    });
};