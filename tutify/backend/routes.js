var express = require('express');
var router = express.Router();
var session = require('express-session');

// Controllers
var accountController = require('./controllers/account.controller')
var appointmentController = require('./controllers/appointment.controller')
var tutorController = require('./controllers/tutor.controller')
var userController = require('./controllers/user.controller')
var courseController = require('./controllers/course.controller')

// -------- TUTOR ROUTES --------- // 

router.get('/getTutors', tutorController.getTutors);

router.get('/getTutor', tutorController.getTutor);

router.post('/updateTutor', tutorController.updateTutor);

router.post('/updateTutorInfo', tutorController.updateTutorInfo);

router.get('/getTutorCourses', tutorController.getTutorCourses);


// -------- USER ROUTES --------- // 

router.get('/getUser', userController.getUser);

router.post('/updateUser', userController.updateUser);

router.post('/findStudents', userController.findStudents);

router.post('/updateUserInfo', userController.updateUserInfo);

router.post('/putUser', userController.putUser);

router.post('/deleteUser', userController.deleteUser);

router.post('/authUser', userController.authUser);

router.get('/logout', userController.logout);

router.get('/checkSession', userController.checkSession);

router.post('/assignTutor', userController.assignTutor);

router.post('/assignCourse', userController.assignCourse);

router.get('/getUserCourses', userController.getUserCourses);

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

// -------- COURSES ROUTES --------- // 

router.get('/getCourses', courseController.getCourses);

module.exports = router;