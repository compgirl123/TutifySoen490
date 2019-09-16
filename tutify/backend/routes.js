var express = require('express');
var router = express.Router();

// Controllers
var accountController = require('./controllers/account.controller')
var appointmentController = require('./controllers/appointment.controller')
var tutorController = require('./controllers/tutor.controller')
var userController = require('./controllers/user.controller')
var dataController = require('./controllers/data.controller')

// -------- TEST DATA ROUTES --------- // 

router.get('/getData', dataController.getData);
  
router.post('/updateData', dataController.updateData);

router.delete('/deleteData', dataController.deleteData);

router.post('/putData', dataController.putData);

// -------- TUTOR ROUTES --------- // 

router.get('/getTutor', tutorController.getTutor);

router.post('/updateTutor', tutorController.updateTutor);

// -------- USER ROUTES --------- // 

router.get('/getUser', userController.getUser);

router.post('/updateUser', userController.updateUser);

router.post('/putUser', userController.putUser);

router.post('/deleteUser', userController.deleteUser);

// -------- ACCOUNT ROUTES --------- // 

router.get('/getAccount', accountController.getAccount);

router.post('/updateAccount', accountController.updateAccount);

router.post('/putAccount', accountController.putAccount);

router.delete('/deleteAccount', accountController.deleteAccount);

// -------- APPOINTMENT ROUTES --------- // 

router.get('/getAppointment', appointmentController.getAppointment);

router.post('/updateAppointment', appointmentController.updateAppointment);

router.post('/putAppointment', appointmentController.putAppointment);

router.delete('/deleteAppointment', appointmentController.deleteAppointment);

module.exports = router;